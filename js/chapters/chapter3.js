/* ============================================================
   chapter3.js — Chương 3: Cây tre trăm đốt (7 màn)
   Phú ông + Bụt tái xuất. Luật mới: "khắc nhập" (chain — nhóm liền nhau).
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 3,
  name: "Chương 3 · Cây tre trăm đốt",
  levels: [

  {type:"place", name:"Anh Khoai ở đợ", cols:5, rows:4,
   scene:"Phú ông thuê anh <b>Khoai</b> về ở đợ, hứa hẹn: “Làm ba năm, ta gả <b>con gái</b> cho!” Khoai làm quần quật ngoài bãi, con gái phú ông đem nước ra cho — còn phú ông chỉ đứng chỉ tay, tránh xa chỗ cỏ bẩn…",
   env:[{id:"baico",cells:[[4,1]]},{id:"tre",cells:[[0,0]]},{id:"nui",cells:[[4,3]]},{id:"nha",cells:[[0,2]]},{id:"cayda",cells:[[2,0]]},{id:"tangda",cells:[[2,3]]},{id:"dantrau",cells:[[4,0]]},{id:"thung",cells:[[2,2]]},{id:"bepenv",cells:[[0,3]]},{id:"caythi",cells:[[3,3]]},{id:"rom",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["khoai","trau","congai","phuong"],
   cons:[{t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ ngoài bãi"},
         {t:"adjChar",c:"khoai",target:"trau",txt:"Khoai chăn trâu"},
         {t:"adjEnv",c:"congai",e:"nha",txt:"Con gái phú ông đứng ở cửa nhà nhìn ra"},
         {t:"adjChar",c:"phuong",target:"congai",txt:"Phú ông đứng cạnh con gái"}],
   story:"Khoai khoẻ như trâu, thật thà như đếm — việc gì cũng xong. Ba năm trôi vèo…"},

  {type:"matrix", name:"Ba năm ở đợ",
   scene:"Nhà phú ông ba khu, <b>mỗi nơi một người</b>. Ruộng thì <b>bùn lầy</b>. Ai ở đâu suốt ba năm qua?",
   rows:["khoai","phuong","congai"], colsM:["ruongbun","nhatren","bep"],
   clues:[{t:"mIs", c:"khoai", col:"ruongbun", txt:"Khoai chẳng ngại bùn, quần quật ngoài ruộng"},
          {t:"mNot",c:"phuong",col:"bep", txt:"Phú ông chẳng bao giờ mó tay việc bếp"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"Hết ba năm, Khoai xin cưới. Phú ông cười khẩy: “Muốn cưới con gái ta? Vào rừng tìm về đây <b>cây tre trăm đốt</b> đã!”"},

  {type:"place", name:"Bụt lại hiện lên", cols:4, rows:3,
   scene:"Khoai vào rừng, chặt hết bụi này sang bụi khác — cây nào cao lắm cũng chỉ vài chục đốt. Trời sập tối, Khoai ngồi giữa rừng tre, ôm mặt khóc…",
   env:[{id:"tre",cells:[[1,0],[3,1]]},{id:"nui",cells:[[0,1]]},{id:"tangda",cells:[[3,0]]},{id:"tre",cells:[[1,2]]}], blocked:[], mud:[],
   chars:["khoai","but"],
   cons:[{t:"adjEnv",c:"khoai",e:"tre",txt:"Khoai ngồi giữa rừng tre"},
         {t:"adjChar",c:"but",target:"khoai",txt:"Bụt hiện lên bên người đang khóc"}],
   story:"“Vì sao con khóc?” — Bụt bảo: “Con chặt đủ <b>một trăm đốt tre</b>, rồi đọc: <b>Khắc nhập! Khắc nhập!</b>”"},

  {type:"place", name:"Khắc nhập!", cols:4, rows:4,
   scene:"Khoai chặt từng đốt tre, xếp ra bãi. Đọc thần chú xong, các đốt phải <b>nằm liền nhau</b> mới nhập thành một cây! Bãi rừng lổn nhổn đá với rơm — tìm chỗ cho khéo…",
   env:[{id:"tre",cells:[[0,0]]},{id:"nui",cells:[[2,1]]},{id:"tangda",cells:[[3,0]]},{id:"tre",cells:[[0,3]]}], blocked:[[1,3],[3,3]], mud:[],
   relic:{id:"dot100",cell:[2,3]},
   chars:["dot1","dot2","dot3","khoai"],
   cons:[{t:"line",cs:["dot1","dot2","dot3"],txt:"Khắc nhập! Gốc tre → đốt tre → ngọn tre nằm THẲNG một hàng"},
         {t:"adjChar",c:"khoai",target:"dot1",txt:"Khoai đứng bên đọc thần chú"},
         {t:"adjEnv",c:"khoai",e:"tre",txt:"Khoai đứng nép bên bụi tre"}],
   story:"Vèo! Các đốt tre nhập thành một cây tre dài <b>đúng trăm đốt</b>. “<b>Khắc xuất!</b>” — cây lại rời ra từng khúc, Khoai bó lại, gánh về làng…"},

  {type:"place", name:"Đám cỗ lật kèo", cols:5, rows:3,
   scene:"Về tới cổng, Khoai sững người: phú ông đang mở <b>cỗ linh đình</b> — gả con gái cho <b>công tử</b> nhà giàu làng bên! Con gái phú ông thì né ông công tử ấy hết cỡ…",
   env:[{id:"mamco",cells:[[2,1]]},{id:"cong",cells:[[0,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[2,2]]},{id:"tangda",cells:[[4,2]]},{id:"nha",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["phuong","chure","congai","khoai"],
   cons:[{t:"adjEnv",c:"phuong",e:"mamco",txt:"Phú ông ngồi chủ tiệc"},
         {t:"adjEnv",c:"chure",e:"mamco",txt:"Công tử chễm chệ bên mâm cỗ"},
         {t:"adjChar",c:"congai",target:"phuong",txt:"Con gái bị cha giữ bên cạnh"},
         {t:"notAdjChar",c:"congai",target:"chure",txt:"Nàng né ông công tử hết cỡ"},
         {t:"adjEnv",c:"khoai",e:"cong",txt:"Khoai đứng ngoài cổng, sững người"}],
   story:"Khoai hít một hơi thật sâu, nhìn thẳng vào đám cỗ… rồi khe khẽ đọc: “<b>Khắc nhập… khắc nhập!</b>”"},

  {type:"place", name:"Dính cả chùm!", cols:5, rows:3,
   scene:"“<b>Khắc nhập! Khắc nhập!</b>” — Phú ông vừa chạm tay vào <b>ngọn tre</b> liền <b>dính chặt</b>! Công tử lao vào kéo — dính nốt! <b>Cây tre vẫn đứng thẳng</b> như thần chú đã định — chỉ có <b>người</b> là dính lủng lẳng, vẹo cả sang bên. Khoai đứng ngoài cổng, tủm tỉm…",
   env:[{id:"cong",cells:[[0,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[4,2]]},{id:"mamco",cells:[[2,0]]},{id:"tre",cells:[[1,2]]},{id:"tangda",cells:[[1,0]]},{id:"nha",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["dot1","dot2","dot3","phuong","chure","khoai"],
   cons:[{t:"line",cs:["dot1","dot2","dot3"],txt:"Cây tre vẫn THẲNG một cây: gốc tre → đốt tre → ngọn tre"},
         {t:"queue",cs:["dot3","phuong","chure"],txt:"Người dính nối đuôi từ ngọn tre: phú ông → công tử (người thì được vẹo!)"},
         {t:"adjEnv",c:"dot1",e:"mamco",txt:"Gốc tre dựng ngay bên mâm cỗ"},
         {t:"adjEnv",c:"khoai",e:"cong",txt:"Khoai đứng ngoài cổng đọc chú"}],
   story:"Phú ông mếu máo: “Khoai ơi, tha cho ta! Ta gả con gái cho con thật mà!” — nói ba lần, Khoai mới đọc: “<b>Khắc xuất!</b>”"},

  /* ---- Điểm xuyết: luật của hai câu thần chú ---- */
  {type:"story", name:"Nhập hay xuất?", reuse:true,
   scene:"Bụt dạy Khoai <b>hai</b> câu: <b>Khắc nhập</b> thì dính liền lại, <b>khắc xuất</b> thì rời nhau ra. Mỗi lúc phải đọc câu nào? <b>Một câu dùng được nhiều lần — cầm rồi chạm liền mấy khung.</b>",
   pieces:["khacnhap","khacxuat"],
   panels:[
     {label:"Trong rừng", who:["khoai"],
      cue:"Chặt đủ một trăm đốt tre rồi, nhưng vẫn là trăm khúc rời — chưa thành cây tre nào cả.",
      answer:"khacnhap", after:"Vèo! Trăm đốt dính liền thành một cây tre dài."},
     {label:"Cửa rừng", who:["khoai"],
      cue:"Cây tre dài quá, vác lên vai thì vướng, không lách nổi ra khỏi rừng.",
      answer:"khacxuat", after:"Cây rời ra từng khúc, Khoai bó lại gánh về gọn ghẽ."},
     {label:"Giữa đám cỗ", who:["phuong","chure"],
      cue:"Phú ông lật kèo, đang cho con gái làm đám cưới với người khác!",
      answer:"khacnhap", after:"Phú ông dính chặt vào cây tre, ai gỡ cũng dính theo!"},
     {label:"Khi phú ông xin tha", who:["phuong"],
      cue:"“Khoai ơi, tha cho ta! Ta gả con gái cho con thật mà!” — nói đủ ba lần.",
      answer:"khacxuat", after:"Cả chùm rời ra, ai về chỗ nấy."}
   ],
   revealArt:"khoai",
   reveal:"Nhập thì dính, xuất thì rời!",
   story:"Khoai gãi đầu cười: hoá ra phép của Bụt chẳng để trả thù ai — chỉ để người thật thà đòi lại được thứ đáng ra là của mình."},

  {type:"place", name:"Đám cưới anh Khoai", cols:5, rows:3,
   scene:"Lần này cỗ bày ra là <b>cưới thật</b>! Cô dâu chú rể đứng bên nhau, phú ông đãi cỗ — lần này thật lòng. Bụt cũng ghé chung vui, cả con trâu nhà cũng được đeo hoa!",
   env:[{id:"mamco",cells:[[2,1]]},{id:"dinh",cells:[[4,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[4,2]]},{id:"tangda",cells:[[0,2]]},{id:"nha",cells:[[2,2]]}], blocked:[], mud:[],
   extras:[{c:"bom",cell:[4,1],note:"đánh hơi thấy mùi cỗ từ tận đầu làng"}],
   chars:["khoai","congai","but","trau","phuong"],
   cons:[{t:"queue",cs:["but","congai","khoai"],txt:"Bụt – cô dâu – chú rể đứng thành một hàng"},
         {t:"adjEnv",c:"khoai",e:"mamco",txt:"Chú rể mời cỗ"},
         {t:"adjEnv",c:"trau",e:"tre",txt:"Trâu đeo hoa buộc ở bụi tre"},
         {t:"adjEnv",c:"phuong",e:"mamco",txt:"Phú ông đãi cỗ — lần này thật lòng"}],
   story:"Anh Khoai thật thà cưới được vợ hiền, cả làng mừng vui.<br><b>— Hết chương 3 —</b><br>Rừng tre đầu làng lại xanh rì. Nghe kể, ở làng <b>Phù Đổng</b> có cậu bé lên ba chẳng nói chẳng cười… mà ngoài biên ải, giặc sắp tràn qua luỹ tre."},

]});
