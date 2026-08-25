/* ============================================================
   chapter5.js — Chương 5: Sơn Tinh Thuỷ Tinh (7 màn)
   Đất diễn của hai luật địa hình: mặt nước chỉ thần nước đứng
   được (onEnv ao), đỉnh núi cho thần núi (onEnv nui).
   Sơn Tinh là Đức Thánh Tản — giọng trang trọng, không pha trò.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 5,
  name: "Chương 5 · Sơn Tinh Thuỷ Tinh",
  levels: [

  {type:"place", name:"Kén rể", cols:5, rows:3,
   scene:"Vua Hùng có nàng công chúa <b>Mị Nương</b> xinh đẹp, mở hội kén rể. Cùng một ngày, <b>hai vị thần</b> đến cầu hôn: thần núi <b>Sơn Tinh</b> và thần nước <b>Thuỷ Tinh</b>. Cả hai đều muốn đứng bên nàng — nhưng hai thần thì <b>gườm nhau</b>, chẳng ai chịu đứng cạnh ai!",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"ao",cells:[[4,2]]},{id:"cayda",cells:[[2,2]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["vua","minuong","sontinh","thuytinh"],
   cons:[{t:"adjEnv",c:"vua",e:"cung",txt:"Vua Hùng ngự trước điện"},
         {t:"adjChar",c:"minuong",target:"vua",txt:"Mị Nương đứng cạnh cha"},
         {t:"adjEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh — chúa vùng non cao"},
         {t:"adjEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh — chúa miền nước thẳm"}],
   story:"Vua Hùng nhìn hai chàng rể, khó xử: người nào cũng tài giỏi phi thường. “Vậy hai ngươi hãy <b>trổ tài</b> cho ta xem!”"},

  {type:"place", name:"Trổ tài", cols:5, rows:4,
   scene:"Sơn Tinh vẫy tay về đông — <b>núi đồi mọc lên</b>; chàng bước hẳn lên đỉnh núi. Thuỷ Tinh gọi gió hô mưa — rồi <b>đứng sừng sững giữa mặt nước</b>! Vua và triều thần đứng xem, kinh ngạc.",
   env:[{id:"nui",cells:[[0,1]]},{id:"cung",cells:[[2,0]]},{id:"ao",cells:[[4,2],[4,3]]},{id:"tre",cells:[[0,3]]},{id:"cayda",cells:[[2,3]]},{id:"tangda",cells:[[4,0]]}], blocked:[], mud:[],
   chars:["sontinh","thuytinh","vua","minuong","linh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh đứng trên núi"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh đứng dưới nước"},
         {t:"adjEnv",c:"vua",e:"cung",txt:"Vua ngự trước điện xem tài"},
         {t:"behind",c:"minuong",target:"vua",txt:"Mị Nương nép sau lưng cha"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính canh bên vua"}],
   story:"Bên tám lạng, bên nửa cân! Vua bèn phán: “Sáng mai, ai mang <b>sính lễ</b> đến trước sẽ được rước Mị Nương: <i>voi chín ngà, gà chín cựa, ngựa chín hồng mao</i>.”"},

  {type:"matrix", name:"Sính lễ",
   scene:"Voi chín ngà, gà chín cựa, ngựa chín hồng mao… nghĩ xem — muốn tìm sính lễ ấy thì phải về đâu? <b>Mỗi vùng một người</b> toả đi trong đêm.",
   rows:["sontinh","thuytinh","suga"], colsM:["rungnui","songbien","dongbang"],
   clues:[{t:"mIs", c:"sontinh", col:"rungnui", txt:"Sơn Tinh về ngay rừng núi — voi ngà, gà cựa, ngựa quý đều là sản vật của rừng!"},
          {t:"mNot",c:"thuytinh", col:"dongbang", txt:"Thuỷ Tinh không lên cạn lâu được — đành quanh quẩn sông biển"},
          {t:"mUniq",txt:"Mỗi vùng chỉ một người tìm"}],
   story:"Sính lễ toàn <b>sản vật núi rừng</b> — dưới sông biển tìm đâu ra voi với gà? Tờ mờ sáng, Sơn Tinh đã có đủ lễ vật…"},

  {type:"place", name:"Rước dâu về núi", cols:5, rows:3,
   scene:"Sơn Tinh đến <b>trước nhất</b>! Đoàn sính lễ <b>nối đuôi nhau</b> vào thành: voi chín ngà đủng đỉnh, ngựa hồng mao gõ móng, gà chín cựa te te gáy. Vua giữ lời, cho rước Mị Nương về núi Tản Viên.",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"tre",cells:[[1,0],[3,0]]},{id:"cayda",cells:[[0,2]]},{id:"tre",cells:[[2,2]]},{id:"tangda",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["sontinh","voi","nguahong","ga","minuong","vua"],
   cons:[{t:"queue",cs:["sontinh","voi","nguahong","ga"],txt:"Đoàn nối đuôi: Sơn Tinh → voi → ngựa → gà"},
         {t:"adjChar",c:"minuong",target:"sontinh",txt:"Mị Nương lên kiệu theo chồng"},
         {t:"adjEnv",c:"vua",e:"cung",txt:"Vua Hùng đứng trước điện tiễn con gái"}],
   story:"Đoàn rước khuất dần về phía núi Tản… Vừa lúc ấy, <b>Thuỷ Tinh</b> mang lễ vật vớt vội dưới biển chạy đến — <b>chậm mất rồi</b>. Thần nước gầm lên một tiếng, trời đất tối sầm!"},

  {type:"place", name:"Thuỷ Tinh nổi giận", cols:5, rows:4,
   scene:"Thuỷ Tinh hô mưa gọi gió, <b>dâng nước cuồn cuộn</b> đuổi theo! Nước ngập cả cánh đồng — bà con dắt trâu <b>chạy lũ</b>, phải tránh thật xa mép nước. Sơn Tinh đưa Mị Nương lên núi, đứng trên cao chặn dòng.",
   env:[{id:"ao",cells:[[1,3],[2,3]]},{id:"nui",cells:[[2,1],[2,2]]},{id:"nha",cells:[[0,0]]},{id:"baico",cells:[[4,0]]},{id:"tangda",cells:[[0,3],[0,1]]},{id:"tre",cells:[[4,3]]},{id:"cayda",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["thuytinh","sontinh","minuong","balao","trau"],
   cons:[{t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh dâng nước"},
         {t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh dời núi lên cao"},
         {t:"onEnv",c:"minuong",e:"nui",txt:"Mị Nương lên núi cùng chồng"},
         {t:"adjEnv",c:"balao",e:"nha",txt:"Bà lão chạy về nhà tránh lũ"},
         {t:"adjEnv",c:"trau",e:"baico",txt:"Trâu dắt lên gò cỏ cao"}],
   story:"Nước dâng lên <b>bao nhiêu</b>… Sơn Tinh dời núi cao lên <b>bấy nhiêu</b>! Hai thần đánh nhau ròng rã mấy tháng trời."},

  {type:"place", name:"Nước dâng, núi dâng", cols:5, rows:4,
   scene:"Trận đánh dữ dội nhất! Nước ngập <b>nửa bàn cờ</b>, sóng đập ầm ầm vào <b>chân núi</b>. Thuỷ Tinh phải áp sát chân núi mà công; Sơn Tinh và Mị Nương đứng vững trên hai đỉnh, không nao núng.",
   env:[{id:"nui",cells:[[1,1],[2,1]]},{id:"ao",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3]]}], blocked:[], mud:[],
   relic:{id:"vaytt",cell:[4,0]},
   chars:["sontinh","minuong","thuytinh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh trấn trên đỉnh núi"},
         {t:"onEnv",c:"minuong",e:"nui",txt:"Mị Nương đứng vững trên đỉnh bên"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh cưỡi sóng"},
         {t:"adjEnv",c:"thuytinh",e:"nui",txt:"…áp sát tận chân núi mà công!"}],
   story:"Đánh mãi, đánh mãi mà núi vẫn cao hơn nước — Thuỷ Tinh <b>kiệt sức</b>, đành cuốn nước rút về."},

  /* ---- Điểm xuyết: vì sao năm nào cũng có lũ ---- */
  {type:"story", name:"Vì sao có mùa lũ",
   scene:"Nước rút rồi, làng xóm ngồi kể lại cho nhau nghe đầu đuôi câu chuyện. <b>Ghép mỗi việc vào đúng người, đúng thứ.</b>",
   pieces:["nui","thuytinh","minuong","sontinh"],
   panels:[
     {label:"Tờ mờ sáng", who:["vua"],
      cue:"Sính lễ toàn <b>sản vật núi rừng</b>: voi chín ngà, gà chín cựa. Ai kiếm đủ trước khi trời sáng?",
      answer:"sontinh", after:"Thần núi đến trước một bước."},
     {label:"Trên kiệu hoa", who:["linh"],
      cue:"Đoàn rước đi khuất dần về phía núi Tản. Ai ngồi trên kiệu?",
      answer:"minuong", after:"Mị Nương theo chồng về núi."},
     {label:"Bến sông", who:["vua"],
      cue:"Đến sau một bước, lễ vật vớt vội dưới biển. Ai gầm lên một tiếng, hô mưa gọi gió?",
      answer:"thuytinh", after:"Thần nước nổi giận, dâng nước đuổi theo."},
     {label:"Suốt mấy tháng trời", who:["lang"],
      cue:"Nước dâng lên <b>bao nhiêu</b>, thứ này lại cao lên <b>bấy nhiêu</b>.",
      answer:"nui", after:"Núi vẫn cao hơn nước, Thuỷ Tinh đành rút về."}
   ],
   revealArt:"sontinh",
   reveal:"Năm nào cũng vậy!",
   story:"Kể xong, bọn trẻ hỏi: “Thế sang năm thần nước có đánh nữa không?” — Người già cười: “Có chứ. Nhưng núi thì năm nào cũng cao hơn nước.”"},

  {type:"place", name:"Hẹn mùa nước sau", cols:4, rows:3,
   scene:"Thuỷ Tinh rút về thuỷ cung, nhưng <b>chưa nguôi giận</b>. Từ đó hai thần không bao giờ đứng gần nhau nữa: một người trên núi Tản, một người dưới sông sâu…",
   env:[{id:"nui",cells:[[0,0]]},{id:"ao",cells:[[3,1],[3,2]]}], blocked:[], mud:[],
   chars:["sontinh","minuong","thuytinh"],
   cons:[{t:"onEnv",c:"sontinh",e:"nui",txt:"Sơn Tinh trấn giữ núi Tản Viên"},
         {t:"adjEnv",c:"minuong",e:"nui",txt:"Mị Nương bên chồng dưới chân núi"},
         {t:"onEnv",c:"thuytinh",e:"ao",txt:"Thuỷ Tinh về thuỷ cung sâu thẳm"}],
   story:"Thế là <b>hằng năm</b>, cứ đến mùa ấy, Thuỷ Tinh lại dâng nước đánh Sơn Tinh một trận — người ta gọi là <b>mùa lũ</b>. Và năm nào cũng vậy… thần núi lại thắng.<br><b>— Hết chương 5 —</b><br>Dưới chân núi Tản, bên bến nước, người làng vẫn ngồi kể chuyện xưa. Có người kể rằng ở làng nọ, có <b>hai anh em sinh đôi</b> giống nhau như hai giọt nước…"},

]});
