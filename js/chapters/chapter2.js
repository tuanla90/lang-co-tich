/* ============================================================
   chapter2.js — Chương 2: Thằng Bờm (7 màn)
   Mỗi câu đồng dao = một màn. Mở đầu nối từ chiếc mo cau chương 1.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 2,
  name: "Chương 2 · Thằng Bờm",
  levels: [

  {type:"place", name:"Chiếc mo cau", cols:4, rows:3,
   scene:"<i>“Thằng Bờm có cái quạt mo…”</i> — Mà quạt ở đâu ra? Chuyện là: cậu bé <b>Bờm</b> dắt trâu ra bãi cỏ, thấy bên đường có chiếc <b>mo cau</b> ai bỏ lại…",
   env:[{id:"baico",cells:[[0,0]]},{id:"mocau",cells:[[2,1]]},{id:"tre",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["bom","trau"],
   cons:[{t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ bên bãi"},
         {t:"adjChar",c:"bom",target:"trau",txt:"Bờm trông trâu"},
         {t:"adjEnv",c:"bom",e:"mocau",txt:"Bờm nhặt chiếc mo cau"}],
   story:"Bờm phe phẩy chiếc mo cau — mát ơi là mát! Từ hôm ấy đi đâu Bờm cũng mang theo cái <b>quạt mo</b>. Tiếng đồn về cái quạt bay đến tận tai phú ông…"},

  {type:"place", name:"Ba bò chín trâu", cols:4, rows:4,
   scene:"<i>“Phú ông xin đổi ba bò chín trâu!”</i> — Phú ông dẫn Bờm ra tận chuồng khoe đàn trâu bò, sán lại gạ đổi. Đường vào chuồng lấm bùn — mà phú ông ham của, lội cũng chịu!",
   env:[{id:"dantrau",cells:[[3,0],[3,1]]},{id:"tre",cells:[[0,3]]}], blocked:[], mud:[[2,0],[2,1]],
   chars:["bom","phuong"],
   cons:[{t:"adjEnv",c:"phuong",e:"dantrau",txt:"Phú ông đứng khoe đàn trâu bò"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông sán lại gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"dantrau",txt:"Bờm rằng: Bờm chẳng lấy trâu!"}],
   story:"“Bờm rằng: Bờm chẳng lấy trâu!” — trâu thì phải chăn, phải tắm, phải cắt cỏ… Quạt mo chỉ việc phe phẩy."},

  {type:"place", name:"Ao sâu cá mè", cols:4, rows:4,
   scene:"<i>“Phú ông xin đổi ao sâu cá mè!”</i> — Phú ông <b>thả con cá mè</b> xuống ao cho Bờm xem, rồi đứng bên mép nước gạ tiếp. Bờm thì đứng xa xa, bịt mũi…",
   env:[{id:"ao",cells:[[0,2],[0,3]]},{id:"tre",cells:[[3,0]]},{id:"nui",cells:[[3,3]]},{id:"cayda",cells:[[0,0]]},{id:"tangda",cells:[[2,3]]}], blocked:[], mud:[],
   chars:["bom","phuong","came"],
   cons:[{t:"onEnv",c:"came",e:"ao",txt:"Thả cá mè xuống ao"},
         {t:"adjEnv",c:"phuong",e:"ao",txt:"Phú ông đứng bên mép ao"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"ao",txt:"Bờm rằng: Bờm chẳng lấy mè!"}],
   story:"“Bờm rằng: Bờm chẳng lấy mè!” — cá thì tanh òm, quạt mo thơm mùi nắng."},

  {type:"matrix", name:"Phiên chợ",
   scene:"Phú ông về nghĩ kế, ra <b>chợ phiên</b> nghe ngóng. Chợ có ba góc — <b>mỗi nơi một… nhân vật</b> (trâu cũng đi chợ!). Chuồng trâu thì <b>bùn lầy</b>.",
   rows:["bom","phuong","trau"], colsM:["chuongtrau","hangxoi","hangnuoc"],
   clues:[{t:"mIs", c:"bom", col:"hangxoi", txt:"Bờm đứng ì trước hàng xôi, hít lấy hít để"},
          {t:"mNot",c:"phuong",col:"chuongtrau",txt:"Phú ông sợ bùn bẩn áo gấm, không lại gần chuồng trâu"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một… nhân vật"}],
   story:"Phú ông ngồi hàng nước, mắt sáng lên: “À! Thằng Bờm thích <b>xôi</b>!” — nhưng ông vẫn muốn thử thêm vài món to đã…"},

  {type:"place", name:"Một bè gỗ lim", cols:5, rows:4,
   scene:"<i>“Phú ông xin đổi một bè gỗ lim!”</i> — Phú ông <b>đứng hẳn lên bè</b> giữa sông mà khoe. Bờm dắt trâu đi ngang bờ, đứng <b>xa mép nước</b>, lắc đầu…",
   env:[{id:"ao",cells:[[0,3],[1,3],[3,3],[4,3]]},{id:"begolim",cells:[[2,3]]},{id:"baico",cells:[[4,0]]},{id:"nui",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["bom","phuong","trau"],
   cons:[{t:"onEnv",c:"phuong",e:"begolim",txt:"Phú ông đứng trên bè khoe gỗ"},
         {t:"adjEnv",c:"trau",e:"baico",txt:"Trâu gặm cỏ trên bờ"},
         {t:"adjChar",c:"bom",target:"trau",txt:"Bờm giữ trâu"},
         {t:"notAdjEnv",c:"bom",e:"ao",txt:"Bờm rằng: Bờm chẳng lấy lim!"}],
   story:"“Bờm rằng: Bờm chẳng lấy lim!” — bè to thế, biết chèo đi đâu? Phú ông đứng giữa sông, tiu nghỉu."},

  {type:"place", name:"Con chim đồi mồi", cols:4, rows:3,
   scene:"<i>“Phú ông xin đổi con chim đồi mồi!”</i> — Phú ông thả con chim quý <b>đậu lên cây đa</b> cho Bờm xem, đứng dưới gốc mà gạ. Bờm né xa cái cây…",
   env:[{id:"cayda",cells:[[2,0],[3,0]]},{id:"tre",cells:[[0,2]]},{id:"tangda",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["bom","phuong","chimdm"],
   cons:[{t:"onEnv",c:"chimdm",e:"cayda",txt:"Chim đồi mồi đậu trên cây đa"},
         {t:"adjEnv",c:"phuong",e:"cayda",txt:"Phú ông đứng dưới gốc khoe chim"},
         {t:"adjChar",c:"phuong",target:"bom",txt:"Phú ông gạ Bờm"},
         {t:"notAdjEnv",c:"bom",e:"cayda",txt:"Bờm rằng: Bờm chẳng lấy mồi!"}],
   story:"“Bờm rằng: Bờm chẳng lấy mồi!” — chim thì bay mất, quạt mo nằm yên trong tay. Phú ông gãi đầu: còn mỗi một thứ chưa thử…"},

  /* ---- Điểm xuyết: vì sao Bờm chê tất ---- */
  {type:"story", name:"Bờm chẳng lấy gì", 
   scene:"Phú ông về nhà, ngồi bấm đốt ngón tay: đã mang bao nhiêu của quý ra đổi mà thằng Bờm đều lắc đầu! <b>Ghép mỗi lời chê vào đúng thứ ông đã đem ra.</b>",
   pieces:["chimdm","begolim","trau","came"],
   panels:[
     {label:"Ngoài chuồng", who:["phuong"],
      cue:"“Thứ này phải chăn, phải tắm, phải cắt cỏ cho ăn — mệt lắm!”",
      answer:"trau", after:"“Bờm rằng: Bờm chẳng lấy trâu!”"},
     {label:"Bờ ao", who:["phuong"],
      cue:"“Thứ này tanh òm, lại nằm tít dưới nước sâu, mò sao cho được?”",
      answer:"came", after:"“Bờm rằng: Bờm chẳng lấy mè!”"},
     {label:"Bến sông", who:["phuong"],
      cue:"“Thứ này to và nặng, trôi giữa sông — biết chèo đi đâu bây giờ?”",
      answer:"begolim", after:"“Bờm rằng: Bờm chẳng lấy lim!”"},
     {label:"Trong lồng", who:["phuong"],
      cue:"“Thứ này đẹp thật, nhưng sổ lồng một cái là bay mất tăm.”",
      answer:"chimdm", after:"“Bờm rằng: Bờm chẳng lấy mồi!”"}
   ],
   revealArt:"namxoi",
   reveal:"Còn mỗi… nắm xôi!",
   story:"Phú ông vỗ đùi đánh đét: của to thì Bờm chê hết, hoá ra Bờm chỉ thích thứ <b>ăn được ngay</b>. Sáng mai, ông gói một nắm xôi thật chặt mang đi…"},

  {type:"place", name:"Nắm xôi", cols:4, rows:3,
   scene:"<i>“Phú ông xin đổi nắm xôi…”</i> — Lần này phú ông chìa ra một <b>nắm xôi</b> nóng hổi. Bờm hít một hơi… rồi sán lại ngay. Trâu cũng hóng theo!",
   env:[{id:"namxoi",cells:[[2,1]]},{id:"dinh",cells:[[3,0]]},{id:"tre",cells:[[0,0]]},{id:"cayda",cells:[[0,2]]}], blocked:[], mud:[],
   relic:{id:"quatmo",cell:[3,2]},
   chars:["bom","phuong","trau"],
   cons:[{t:"adjEnv",c:"phuong",e:"namxoi",txt:"Phú ông chìa nắm xôi ra"},
         {t:"adjEnv",c:"bom",e:"namxoi",txt:"Bờm sán lại — thơm quá!"},
         {t:"behind",c:"trau",target:"bom",txt:"Trâu đứng sau lưng Bờm"}],
   story:"“<b>Bờm cười!</b>” — quạt mo đổi nắm xôi, ai cũng vừa lòng: Bờm no bụng, phú ông mát tay.<br><b>— Hết chương 2 —</b><br>Phú ông phe phẩy quạt ra về, bụng tính: nhà đang thiếu người làm… Nghe nói làng bên có anh <b>Khoai</b>, khoẻ như trâu, thật thà như đếm —"},

]});
