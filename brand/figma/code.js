/* =============================================================
   NESP Brand Setup — Figma Plugin
   منصة الإدارة التنفيذية للخدمات التمريضية · مستشفى جازان التخصصي
   -------------------------------------------------------------
   يُنشئ هذا البلجن تلقائياً:
     1) مجموعة متغيّرات ألوان الهوية (Color Variables)
     2) أنماط نصية (Text Styles) عربي/لاتيني
     3) صفحة "NESP Brand" فيها قفل الشعار الرسمي (نصّي) + لوحة الألوان
   ملاحظة: لصورة الرمز (النجمة) استورد mark-white-transparent.png يدوياً
   بالسحب والإفلات في المكان المحدّد (يوجد إطار مُعلّم "ضع الرمز هنا").
   ============================================================= */

const C = {
  navy:      { r: 0x10/255, g: 0x20/255, b: 0x37/255 },
  navyDeep:  { r: 0x0B/255, g: 0x16/255, b: 0x26/255 },
  navy800:   { r: 0x18/255, g: 0x28/255, b: 0x3C/255 },
  blue:      { r: 0x3C/255, g: 0x78/255, b: 0xA8/255 },
  blueLight: { r: 0x60/255, g: 0x9C/255, b: 0xC0/255 },
  blueMid:   { r: 0x48/255, g: 0x78/255, b: 0xA8/255 },
  sky:       { r: 0x8F/255, g: 0xC1/255, b: 0xDB/255 },
  white:     { r: 0xFB/255, g: 0xFC/255, b: 0xFC/255 },
  gray300:   { r: 0xC2/255, g: 0xCD/255, b: 0xD8/255 },
  gray700:   { r: 0x3E/255, g: 0x4A/255, b: 0x5A/255 },
  success:   { r: 0x2E/255, g: 0x9E/255, b: 0x6B/255 },
  warning:   { r: 0xE0/255, g: 0xA0/255, b: 0x30/255 },
  danger:    { r: 0xD2/255, g: 0x4B/255, b: 0x4B/255 },
};

async function main() {
  // ---- 1) Color variables ----
  let collection = figma.variables.getLocalVariableCollectionsAsync
    ? (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === "NESP Brand")
    : null;
  if (!collection) collection = figma.variables.createVariableCollection("NESP Brand");

  const makeColor = (name, rgb, scopes) => {
    const v = figma.variables.createVariable(name, collection, "COLOR");
    v.setValueForMode(collection.modes[0].modeId, rgb);
    v.scopes = scopes || ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"];
    return v;
  };
  makeColor("brand/navy", C.navy);
  makeColor("brand/navy-deep", C.navyDeep);
  makeColor("brand/navy-800", C.navy800);
  makeColor("brand/blue", C.blue);
  makeColor("brand/blue-light", C.blueLight);
  makeColor("brand/blue-mid", C.blueMid);
  makeColor("brand/sky", C.sky);
  makeColor("neutral/white", C.white);
  makeColor("neutral/gray-300", C.gray300);
  makeColor("neutral/gray-700", C.gray700);
  makeColor("semantic/success", C.success);
  makeColor("semantic/warning", C.warning);
  makeColor("semantic/danger", C.danger);

  // ---- 2) Fonts ----
  const latin = { family: "Poppins", style: "Bold" };
  const latinMed = { family: "Poppins", style: "Medium" };
  const ar = { family: "IBM Plex Sans Arabic", style: "SemiBold" };
  const arReg = { family: "IBM Plex Sans Arabic", style: "Regular" };
  try { await figma.loadFontAsync(latin); } catch(e) {}
  try { await figma.loadFontAsync(latinMed); } catch(e) {}
  try { await figma.loadFontAsync(ar); } catch(e) {}
  try { await figma.loadFontAsync(arReg); } catch(e) {}
  // fallback
  const fb = { family: "Inter", style: "Bold" };
  await figma.loadFontAsync(fb).catch(()=>{});
  const fbReg = { family: "Inter", style: "Regular" };
  await figma.loadFontAsync(fbReg).catch(()=>{});

  const pick = async (pref, fallback) => {
    try { await figma.loadFontAsync(pref); return pref; } catch(e){ return fallback; }
  };
  const fLatinBold = await pick(latin, fb);
  const fLatinMed  = await pick(latinMed, fb);
  const fArSemi    = await pick(ar, fb);
  const fArReg     = await pick(arReg, fbReg);

  // ---- 3) Brand page with official lockup (text) ----
  const page = figma.createPage();
  page.name = "NESP Brand";
  await figma.setCurrentPageAsync(page);

  // Navy hero frame (auto-layout)
  const hero = figma.createFrame();
  hero.name = "Logo Lockup — Official";
  hero.resize(720, 820);
  hero.x = 200; hero.y = 200;
  hero.layoutMode = "VERTICAL";
  hero.primaryAxisAlignItems = "CENTER";
  hero.counterAxisAlignItems = "CENTER";
  hero.paddingTop = 80; hero.paddingBottom = 80;
  hero.itemSpacing = 28;
  hero.fills = [{ type: "GRADIENT_LINEAR",
    gradientTransform: [[0.7,0.7,0],[ -0.7,0.7,0.3]],
    gradientStops: [
      { position: 0, color: { ...C.navy800, a: 1 } },
      { position: 1, color: { ...C.navy, a: 1 } },
    ]}];

  // placeholder for the star mark image
  const markSlot = figma.createFrame();
  markSlot.name = "★ ضع صورة الرمز هنا · Drop mark PNG here";
  markSlot.resize(300, 300);
  markSlot.fills = [{ type: "SOLID", color: C.blue, opacity: 0.12 }];
  markSlot.strokes = [{ type: "SOLID", color: C.blueLight }];
  markSlot.dashPattern = [8, 8];
  markSlot.cornerRadius = 16;
  hero.appendChild(markSlot);
  markSlot.layoutSizingHorizontal = "FIXED";
  markSlot.layoutSizingVertical = "FIXED";

  const mkText = async (txt, font, size, color, rtl) => {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    t.characters = txt;
    t.fills = [{ type: "SOLID", color }];
    if (rtl) t.textAlignHorizontal = "CENTER";
    hero.appendChild(t);
    t.layoutSizingHorizontal = "HUG";
    return t;
  };
  await mkText("Nursing Platform", fLatinBold, 44, C.white, false);
  await mkText("منصة الإدارة التنفيذية للخدمات التمريضية", fArSemi, 24, C.white, true);
  await mkText("مستشفى جازان التخصصي", fArReg, 18, C.gray300, true);

  // Color palette strip
  const strip = figma.createFrame();
  strip.name = "Color Palette";
  strip.x = 200; strip.y = 1080;
  strip.layoutMode = "HORIZONTAL";
  strip.itemSpacing = 0;
  strip.resize(720, 90);
  strip.fills = [];
  const swatches = [
    ["navy", C.navy], ["navy-800", C.navy800], ["blue", C.blue],
    ["blue-mid", C.blueMid], ["blue-light", C.blueLight], ["sky", C.sky],
    ["white", C.white], ["gray-300", C.gray300],
  ];
  for (const [nm, col] of swatches) {
    const s = figma.createFrame();
    s.resize(90, 90); s.fills = [{ type: "SOLID", color: col }];
    strip.appendChild(s);
    s.layoutSizingHorizontal = "FILL";
  }

  figma.currentPage.selection = [hero];
  figma.viewport.scrollAndZoomIntoView([hero, strip]);
  figma.closePlugin("✅ تم إنشاء هوية NESP — أضف صورة الرمز في الإطار المُعلّم.");
}

main().catch(err => figma.closePlugin("خطأ: " + err.message));
