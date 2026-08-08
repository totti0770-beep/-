from flask import Flask, render_template, request, redirect, url_for, session, flash
from config import Config
from models import db, Department, Staff, PerformanceModel, RecognitionModel
from functools import wraps
from sqlalchemy import func

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('يرجى تسجيل الدخول أولاً للوصول إلى النظام.', 'error')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
@login_required
def dashboard():
    user = Staff.query.get(session['user_id'])
    total_nurses = Staff.query.count()
    
    satisfaction_avg = db.session.query(func.avg(PerformanceModel.value)).filter(
        PerformanceModel.metric_name == 'معدل الرضا'
    ).scalar() or 0
    
    training_sum = db.session.query(func.sum(PerformanceModel.value)).filter(
        PerformanceModel.metric_name == 'ساعات التدريب'
    ).scalar() or 0
    
    stats = {
        'total_nurses': total_nurses,
        'satisfaction_rate': f"{int(satisfaction_avg)}%",
        'training_hours': int(training_sum)
    }
    
    recent_staff = Staff.query.order_by(Staff.id.desc()).limit(5).all()
    recent_awards = RecognitionModel.query.order_by(RecognitionModel.timestamp.desc()).limit(3).all()
    
    return render_template('dashboard.html', stats=stats, current_user=user, recent_staff=recent_staff, recent_awards=recent_awards)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        employee_id = request.form.get('employee_id')
        password = request.form.get('password')
        user = Staff.query.filter_by(employee_id=employee_id).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            session['user_name'] = user.name
            flash('تم تسجيل الدخول بنجاح.', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('عذراً، الرقم الوظيفي أو كلمة المرور غير صحيحة.', 'error')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('تم تسجيل خروجك بأمان.', 'success')
    return redirect(url_for('login'))

@app.route('/profile')
@login_required
def profile():
    user = Staff.query.get(session['user_id'])
    user_recognitions = RecognitionModel.query.filter_by(staff_id=user.id).order_by(RecognitionModel.timestamp.desc()).all()
    return render_template('profile.html', current_user=user, recognitions=user_recognitions)

@app.route('/staff')
@login_required
def staff_database():
    user = Staff.query.get(session['user_id'])
    search_query = request.args.get('search', '').strip()
    department_filter = request.args.get('department', '')
    status_filter = request.args.get('status', '')
    
    query = Staff.query
    if search_query:
        query = query.filter((Staff.name.like(f'%{search_query}%')) | (Staff.employee_id.like(f'%{search_query}%')))
    if department_filter:
        query = query.filter(Staff.department_id == int(department_filter))
    if status_filter:
        query = query.filter(Staff.status == status_filter)
        
    staff_members = query.all()
    departments = Department.query.all()
    return render_template('staff.html', current_user=user, staff_members=staff_members, departments=departments, search_query=search_query, selected_dept=department_filter, selected_status=status_filter)

@app.route('/awards', methods=['GET', 'POST'])
@login_required
def awards():
    user = Staff.query.get(session['user_id'])
    
    if request.method == 'POST':
        staff_id = request.form.get('staff_id')
        award_type = request.form.get('award_type')
        
        if staff_id and award_type:
            new_award = RecognitionModel(
                staff_id=int(staff_id),
                award_type=award_type,
                granted_by=user.name
            )
            db.session.add(new_award)
            db.session.commit()
            flash('تم منح التكريم والشارة للموظف بنجاح! 🏆', 'success')
            return redirect(url_for('awards'))
        else:
            flash('يرجى تعبئة كافة الحقول المطلوبة لمنح التكريم.', 'error')

    all_recognitions = RecognitionModel.query.order_by(RecognitionModel.timestamp.desc()).all()
    all_staff = Staff.query.all()
    
    return render_template('awards.html', current_user=user, recognitions=all_recognitions, staff_members=all_staff)

@app.cli.command("seed-db")
def seed_db():
    db.create_all()
    
    icu_dept = Department.query.filter_by(name='العناية المركزة (ICU)').first()
    if not icu_dept:
        icu_dept = Department(name='العناية المركزة (ICU)', location='مبنى ب - الدور الأول')
        er_dept = Department(name='الطوارئ (ER)', location='مبنى أ - الدور الأرضي')
        oncology_dept = Department(name='عناية الأورام (Oncology ICU)', location='مبنى ج - الدور الثاني')
        db.session.add_all([icu_dept, er_dept, oncology_dept])
        db.session.commit()
        
        nurse1 = Staff(name='نورة عبد الله الشهري', employee_id='JSH1001', email='noura.s@jsh.gov.sa', role='مشرف تمريض ICU', status='نشط', department_id=icu_dept.id)
        nurse1.set_password('Jazan2026')
        
        nurse2 = Staff(name='أحمد علي حكمي', employee_id='JSH1002', email='ahmed.h@jsh.gov.sa', role='ممرض إكلينيكي أول', status='نشط', department_id=icu_dept.id)
        nurse2.set_password('Jazan2026')
        
        nurse3 = Staff(name='سارة محمد علواني', employee_id='JSH1003', email='sara.a@jsh.gov.sa', role='ممرض مسجل ER', status='في إجازة', department_id=er_dept.id)
        nurse3.set_password('Jazan2026')
        
        nurse4 = Staff(name='خالد عمر مدخلي', employee_id='JSH1004', email='khaled.m@jsh.gov.sa', role='أخصائي تمريض حرج', status='في تدريب', department_id=oncology_dept.id)
        nurse4.set_password('Jazan2026')

        db.session.add_all([nurse1, nurse2, nurse3, nurse4])
        db.session.commit()
        
        db.session.add_all([
            PerformanceModel(staff_id=nurse1.id, metric_name='ساعات التدريب', value=32),
            PerformanceModel(staff_id=nurse1.id, metric_name='معدل الرضا', value=96),
            PerformanceModel(staff_id=nurse2.id, metric_name='ساعات التدريب', value=24),
            PerformanceModel(staff_id=nurse2.id, metric_name='معدل الرضا', value=92),
            PerformanceModel(staff_id=nurse3.id, metric_name='ساعات التدريب', value=16),
            PerformanceModel(staff_id=nurse3.id, metric_name='معدل الرضا', value=88)
        ])
        
        db.session.add_all([
            RecognitionModel(staff_id=nurse1.id, award_type='وسام التميز القيادي 🥇', granted_by='إدارة المستشفى'),
            RecognitionModel(staff_id=nurse2.id, award_type='شارة الجودة الإكلينيكية ⭐', granted_by='نورة عبد الله الشهري')
        ])
        
        db.session.commit()
        print("🎉 تم تجديد قاعدة البيانات بالكامل وضخ بيانات التجربة والتكريم بنجاح!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
