export const additionalCopy = {
  en: {
    transferProgress: 'Transfer progress',
    exportProgress: 'Export progress',
    importProgress: 'Import progress',
    progressExportNote: 'The backup includes your learner name, saved code, and progress. Keep the file private.',
    importConfirm: 'Import this backup? It will replace the current learner profile, progress, and code drafts.',
    importComplete: 'Progress imported.',
    importFailed: 'Could not import that file. Choose a valid Python Project Library backup.',
    importTooLarge: 'That file is larger than 2 MB.',
    certificateNote: 'Self-reported; based on progress saved in this browser and not independently verified.',
    lesson: {
      'file-journal': { title: 'Study journal file', topic: 'Files and paths', summary: 'Write a short study log to a text file, then read it back and summarize the entries.', goals: ['Use pathlib.Path for a file path.', 'Write and read UTF-8 text.', 'Append new data without replacing the file.'], task: 'Append one new study entry with a with block, then print the full journal and its entry count.', hint: 'Open the path with mode "a" and encoding="utf-8" to append safely.' },
      'json-contact-book': { title: 'JSON contact book', topic: 'JSON and structured data', summary: 'Convert contact records to JSON text and load them back as Python data.', goals: ['Use json.dumps() and json.loads().', 'Keep records as dictionaries in a list.', 'Find a record by one of its fields.'], task: 'Add another contact and write a function that finds a contact by name, returning None when there is no match.', hint: 'Loop through the list and compare each record’s name with the search text.' },
      'csv-sales-report': { title: 'CSV sales report', topic: 'CSV and data summaries', summary: 'Read rows of sales data and calculate totals by product.', goals: ['Read rows with csv.DictReader.', 'Convert text amounts to numbers.', 'Aggregate rows in a dictionary.'], task: 'Add another sale and report the total units and revenue for each product.', hint: 'Store each product’s running total in a dictionary keyed by its name.' },
      'debug-empty-scores': { title: 'Debug empty scores', topic: 'Debugging and edge cases', summary: 'Use an error message and a small data set to find and fix an empty-list bug.', goals: ['Read a traceback to locate a failing line.', 'Check edge cases before dividing.', 'Choose a clear result for missing data.'], task: 'Fix average() so a student with no scores does not crash the report. Skip that student and print a helpful note.', hint: 'Check whether scores is empty before calculating sum(scores) / len(scores).' },
      'unit-test-expenses': { title: 'Test an expense helper', topic: 'Unit testing', summary: 'Write small tests for normal values and boundary cases with unittest.', goals: ['Separate a function from its examples.', 'Use unittest assertions.', 'Test invalid and boundary inputs.'], task: 'Add tests for a zero amount and an empty description, then extend the function to reject both.', hint: 'Use assertRaises(ValueError) for invalid input and assertEqual() for the returned record.' }
    }
  },
  my: {
    transferProgress: 'သင်ယူမှုမှတ်တမ်း လွှဲပြောင်းရန်',
    exportProgress: 'မှတ်တမ်းထုတ်ယူရန်',
    importProgress: 'မှတ်တမ်းထည့်သွင်းရန်',
    progressExportNote: 'ဖိုင်တွင် သင်ယူသူအမည်၊ သိမ်းထားသောကုဒ်နှင့် တိုးတက်မှု ပါဝင်သည်။ လုံခြုံစွာ သိမ်းထားပါ။',
    importConfirm: 'ဤအရန်ဖိုင်ကို ထည့်သွင်းမလား။ လက်ရှိသင်ယူသူ၊ တိုးတက်မှုနှင့် ကုဒ်မူကြမ်းများကို အစားထိုးမည်။',
    importComplete: 'သင်ယူမှုမှတ်တမ်းကို ထည့်သွင်းပြီးပါပြီ။',
    importFailed: 'ဖိုင်ကို ထည့်သွင်း၍မရပါ။ မှန်ကန်သော Python Project Library အရန်ဖိုင်ကို ရွေးပါ။',
    importTooLarge: 'ဖိုင်အရွယ်အစားသည် 2 MB ထက်ကြီးနေသည်။',
    certificateNote: 'ကိုယ်တိုင်အစီရင်ခံထားခြင်းဖြစ်သည်။ ဤဘရောက်ဇာတွင် သိမ်းထားသော တိုးတက်မှုအပေါ်သာ အခြေခံပြီး သီးခြားအတည်ပြုထားခြင်း မရှိပါ။',
    lesson: {
      'file-journal': { title: 'လေ့လာမှုမှတ်တမ်းဖိုင်', topic: 'ဖိုင်နှင့်လမ်းကြောင်း', summary: 'စာသားဖိုင်ထဲသို့ လေ့လာမှုမှတ်တမ်းရေးပြီး ပြန်ဖတ်ကာ အကြောင်းအရာကို အကျဉ်းချုပ်ပါ။', goals: ['ဖိုင်လမ်းကြောင်းအတွက် pathlib.Path သုံးပါ။', 'UTF-8 စာသားကို ရေးပြီးဖတ်ပါ။', 'ဖိုင်ကို အစားမထိုးဘဲ ဒေတာအသစ် ထပ်ဖြည့်ပါ။'], task: 'with block ကိုသုံးပြီး လေ့လာမှုမှတ်တမ်းတစ်ခု ထပ်ဖြည့်ကာ ဖိုင်တစ်ခုလုံးနှင့် အရေအတွက်ကို ပြပါ။', hint: 'ထပ်ဖြည့်ရန် mode="a" နှင့် encoding="utf-8" ဖြင့် ဖိုင်ဖွင့်ပါ။' },
      'json-contact-book': { title: 'JSON အဆက်အသွယ်စာရင်း', topic: 'JSON နှင့် ဖွဲ့စည်းထားသောဒေတာ', summary: 'အဆက်အသွယ်မှတ်တမ်းများကို JSON စာသားအဖြစ်ပြောင်းပြီး Python ဒေတာအဖြစ် ပြန်ဖတ်ပါ။', goals: ['json.dumps() နှင့် json.loads() သုံးပါ။', 'မှတ်တမ်းများကို dictionary list အဖြစ်သိမ်းပါ။', 'အကွက်တစ်ခုဖြင့် မှတ်တမ်းရှာပါ။'], task: 'အဆက်အသွယ်တစ်ဦး ထပ်ထည့်ပြီး အမည်ဖြင့်ရှာကာ မတွေ့လျှင် None ပြန်ပေးသော function ရေးပါ။', hint: 'စာရင်းကို လှည့်ပတ်ပြီး မှတ်တမ်းတစ်ခုစီ၏ အမည်ကို ရှာဖွေစာသားနှင့် နှိုင်းယှဉ်ပါ။' },
      'csv-sales-report': { title: 'CSV အရောင်းအစီရင်ခံစာ', topic: 'CSV နှင့် ဒေတာအကျဉ်းချုပ်', summary: 'အရောင်းဒေတာတန်းများကို ဖတ်ပြီး ကုန်ပစ္စည်းအလိုက် စုစုပေါင်းတွက်ပါ။', goals: ['csv.DictReader ဖြင့် တန်းများဖတ်ပါ။', 'စာသားပမာဏကို ကိန်းဂဏန်းပြောင်းပါ။', 'dictionary ထဲတွင် စုစည်းပါ။'], task: 'အရောင်းတစ်ကြောင်း ထပ်ထည့်ပြီး ကုန်ပစ္စည်းတစ်ခုစီ၏ အရေအတွက်နှင့် ဝင်ငွေကို ပြပါ။', hint: 'ကုန်ပစ္စည်းအမည်ကို dictionary key အဖြစ်ထားပြီး စုစုပေါင်းကို သိမ်းပါ။' },
      'debug-empty-scores': { title: 'အမှတ်မရှိသောစာရင်းကို ပြင်ဆင်ပါ', topic: 'အမှားရှာခြင်းနှင့် အစွန်းအခြေအနေ', summary: 'အမှားစာနှင့် ဒေတာနမူနာငယ်ကို အသုံးပြုပြီး စာရင်းအလွတ်ကြောင့်ဖြစ်သော bug ကို ရှာပြင်ပါ။', goals: ['Traceback ဖြင့် အမှားဖြစ်သောလိုင်းကို ရှာပါ။', 'မခွဲမီ အစွန်းအခြေအနေကို စစ်ပါ။', 'ဒေတာမရှိသည့်အခါ ရလဒ်ကို ရှင်းလင်းစွာ သတ်မှတ်ပါ။'], task: 'အမှတ်မရှိသော ကျောင်းသားကြောင့် မပျက်စေရန် average() ကိုပြင်ပါ။ ထိုကျောင်းသားကို ကျော်ပြီး ရှင်းလင်းသောစာပြပါ။', hint: 'sum(scores) / len(scores) မတွက်မီ scores အလွတ်ဖြစ်မဖြစ် စစ်ပါ။' },
      'unit-test-expenses': { title: 'အသုံးစရိတ် function ကို စမ်းသပ်ပါ', topic: 'Unit testing', summary: 'unittest ဖြင့် ပုံမှန်တန်ဖိုးနှင့် နယ်နိမိတ်အခြေအနေများအတွက် စမ်းသပ်မှုရေးပါ။', goals: ['Function ကို နမူနာအသုံးပြုမှုမှ ခွဲပါ။', 'unittest assertion များသုံးပါ။', 'မမှန်သောနှင့် နယ်နိမိတ်တန်ဖိုးများကို စမ်းပါ။'], task: 'သုညပမာဏနှင့် ဖော်ပြချက်အလွတ်အတွက် စမ်းသပ်မှုထည့်ပြီး နှစ်ခုစလုံးကို ငြင်းပယ်ရန် function ကို တိုးချဲ့ပါ။', hint: 'မမှန်သော input အတွက် assertRaises(ValueError)၊ ရလဒ်အတွက် assertEqual() သုံးပါ။' }
    }
  },
  th: {
    transferProgress: 'ย้ายความคืบหน้า',
    exportProgress: 'ส่งออกความคืบหน้า',
    importProgress: 'นำเข้าความคืบหน้า',
    progressExportNote: 'ไฟล์สำรองมีชื่อผู้เรียน โค้ดที่บันทึก และความคืบหน้า โปรดเก็บไฟล์นี้ไว้เป็นส่วนตัว',
    importConfirm: 'นำเข้าไฟล์สำรองนี้หรือไม่? โปรไฟล์ผู้เรียน ความคืบหน้า และโค้ดร่างปัจจุบันจะถูกแทนที่',
    importComplete: 'นำเข้าความคืบหน้าแล้ว',
    importFailed: 'นำเข้าไฟล์นี้ไม่ได้ โปรดเลือกไฟล์สำรองของ Python Project Library ที่ถูกต้อง',
    importTooLarge: 'ไฟล์มีขนาดใหญ่กว่า 2 MB',
    certificateNote: 'เป็นข้อมูลที่ผู้เรียนรายงานเอง อ้างอิงจากความคืบหน้าที่บันทึกในเบราว์เซอร์นี้ และไม่มีการตรวจสอบแยกต่างหาก',
    lesson: {
      'file-journal': { title: 'ไฟล์บันทึกการเรียน', topic: 'ไฟล์และพาธ', summary: 'เขียนบันทึกการเรียนลงไฟล์ข้อความ แล้วอ่านกลับมาและสรุปรายการ', goals: ['ใช้ pathlib.Path ระบุพาธไฟล์', 'เขียนและอ่านข้อความ UTF-8', 'เพิ่มข้อมูลโดยไม่เขียนทับไฟล์'], task: 'เพิ่มบันทึกการเรียนด้วยบล็อก with แล้วแสดงบันทึกทั้งหมดและจำนวนรายการ', hint: 'เปิดไฟล์ด้วย mode="a" และ encoding="utf-8" เพื่อเพิ่มข้อมูลอย่างปลอดภัย' },
      'json-contact-book': { title: 'สมุดรายชื่อ JSON', topic: 'JSON และข้อมูลแบบมีโครงสร้าง', summary: 'แปลงรายชื่อผู้ติดต่อเป็นข้อความ JSON แล้วโหลดกลับมาเป็นข้อมูล Python', goals: ['ใช้ json.dumps() และ json.loads()', 'เก็บระเบียนเป็น dictionary ใน list', 'ค้นหาระเบียนจากฟิลด์หนึ่ง'], task: 'เพิ่มรายชื่ออีกคนและเขียนฟังก์ชันค้นหาด้วยชื่อ โดยคืนค่า None เมื่อไม่พบ', hint: 'วนดูรายการและเปรียบเทียบชื่อในแต่ละระเบียนกับข้อความค้นหา' },
      'csv-sales-report': { title: 'รายงานยอดขาย CSV', topic: 'CSV และสรุปข้อมูล', summary: 'อ่านแถวข้อมูลยอดขายและคำนวณยอดรวมแยกตามสินค้า', goals: ['อ่านแถวด้วย csv.DictReader', 'แปลงจำนวนข้อความเป็นตัวเลข', 'รวมข้อมูลไว้ใน dictionary'], task: 'เพิ่มรายการขายอีกหนึ่งรายการ แล้วรายงานจำนวนชิ้นและรายรับของแต่ละสินค้า', hint: 'เก็บยอดสะสมใน dictionary โดยใช้ชื่อสินค้าเป็น key' },
      'debug-empty-scores': { title: 'แก้บั๊กคะแนนว่าง', topic: 'การดีบักและกรณีขอบเขต', summary: 'ใช้ข้อความผิดพลาดและข้อมูลตัวอย่างเล็ก ๆ เพื่อค้นหาและแก้บั๊กรายการว่าง', goals: ['อ่าน traceback เพื่อหาบรรทัดที่ผิด', 'ตรวจกรณีขอบเขตก่อนหาร', 'กำหนดผลลัพธ์เมื่อไม่มีข้อมูลให้ชัดเจน'], task: 'แก้ average() ไม่ให้รายงานล้มเมื่อผู้เรียนไม่มีคะแนน ให้ข้ามผู้เรียนคนนั้นและแสดงข้อความอธิบาย', hint: 'ตรวจว่า scores ว่างหรือไม่ก่อนคำนวณ sum(scores) / len(scores)' },
      'unit-test-expenses': { title: 'ทดสอบฟังก์ชันค่าใช้จ่าย', topic: 'การทดสอบหน่วย', summary: 'เขียนการทดสอบค่าปกติและกรณีขอบเขตด้วย unittest', goals: ['แยกฟังก์ชันออกจากตัวอย่างใช้งาน', 'ใช้ assertion ของ unittest', 'ทดสอบค่าที่ไม่ถูกต้องและค่าขอบเขต'], task: 'เพิ่มการทดสอบจำนวนเงินศูนย์และคำอธิบายว่าง แล้วปรับฟังก์ชันให้ปฏิเสธทั้งสองกรณี', hint: 'ใช้ assertRaises(ValueError) กับข้อมูลไม่ถูกต้อง และ assertEqual() กับผลลัพธ์' }
    }
  }
};
