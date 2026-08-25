/* ============================================================
   chapter4.js — Chương 4: Thánh Gióng (7 màn)
   Dàn hoàng gia đầy đủ (vua, sứ giả, 2 lính). Tre ngà chương 1
   được trả nghĩa: "ai nhổ nổi cả bụi thì khoẻ như thần".
   Giọng chương: trang trọng, ấm — không pha trò với bậc Thánh.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 4,
  name: "Chương 4 · Thánh Gióng",
  levels: [

  {type:"place", name:"Vết chân lạ", cols:4, rows:3,
   scene:"Làng Phù Đổng thuở ấy có hai vợ chồng già chưa có con. Một sớm ra đồng, bà thấy một <b>vết chân to lạ lùng</b> — bà tò mò, <b>ướm thử chân mình</b> vào…",
   env:[{id:"vetchan",cells:[[1,1]]},{id:"baico",cells:[[3,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["me"],
   cons:[{t:"onEnv",c:"me",e:"vetchan",txt:"Bà ướm chân vào vết chân lạ"}],
   story:"Về nhà, bà mang thai, sinh ra một cậu bé mặt mũi khôi ngô, đặt tên là <b>Gióng</b>. Nhưng lạ thay — lên ba tuổi, Gióng vẫn <b>chẳng nói, chẳng cười</b>, đặt đâu nằm đấy."},

  {type:"matrix", name:"Giặc đến!",
   scene:"<b>Giặc Ân</b> tràn qua biên ải! Triều đình rối như canh hẹ — <b>mỗi nơi một người</b>: vua, lính, sứ giả, ai đang ở đâu?",
   rows:["vua","linh","suga"], colsM:["cungvua","bienai","langpd"],
   clues:[{t:"mIs", c:"linh", col:"bienai", txt:"Lính đã ra hết biên ải chặn giặc"},
          {t:"mNot",c:"suga", col:"cungvua", txt:"Sứ giả không ở lại cung — vua sai đi khắp nơi tìm người tài"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"Sứ giả đi rao khắp nơi: <i>“Ai tài giỏi, mau ra giúp nước cứu dân!”</i> — Tiếng rao vọng đến tận làng Phù Đổng…"},

  {type:"place", name:"Tiếng nói đầu tiên", cols:4, rows:3,
   scene:"Nghe tiếng rao, cậu bé ba năm không nói bỗng ngồi bật dậy: <b>“Mẹ ơi, mời sứ giả vào đây!”</b> Mẹ mừng rơi nước mắt, sứ giả vội vào tận nhà…",
   env:[{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[3,2]]},{id:"cayda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["giong","suga","me"],
   cons:[{t:"adjEnv",c:"giong",e:"nha",txt:"Gióng ngồi dậy bên hiên nhà"},
         {t:"adjChar",c:"suga",target:"giong",txt:"Sứ giả vào tận nơi nghe lời cậu bé"},
         {t:"adjChar",c:"me",target:"giong",txt:"Mẹ đứng bên, mừng rơi nước mắt"}],
   story:"Gióng dõng dạc: <i>“Về tâu vua rèn cho ta <b>ngựa sắt, roi sắt, áo giáp sắt</b> — ta sẽ phá tan lũ giặc!”</i>"},

  {type:"place", name:"Cả làng góp gạo", cols:5, rows:4,
   scene:"Từ hôm ấy Gióng <b>ăn bao nhiêu cũng không no</b>, lớn nhanh như thổi. Mẹ thổi cơm không kịp — cả làng góp gạo, bà con đội thóc, trâu chở nếp về nuôi Gióng!",
   env:[{id:"noicom",cells:[[2,1],[2,2]]},{id:"bepenv",cells:[[0,1]]},{id:"tre",cells:[[4,0]]},{id:"cayda",cells:[[0,3]]},{id:"tangda",cells:[[4,3]]}], blocked:[], mud:[],
   chars:["giong","me","balao","trau"],
   cons:[{t:"adjEnv",c:"giong",e:"noicom",txt:"Gióng ngồi ăn — hết nồi này đến nồi khác"},
         {t:"adjEnv",c:"me",e:"bepenv",txt:"Mẹ thổi cơm bên bếp"},
         {t:"adjChar",c:"balao",target:"me",txt:"Bà lão sang giúp mẹ Gióng"},
         {t:"behind",c:"trau",target:"giong",txt:"Trâu đứng sau lưng Gióng"}],
   story:"Ngựa sắt, roi sắt, giáp sắt vừa rèn xong đưa đến — Gióng <b>vươn vai một cái</b>, bỗng thành <b>tráng sĩ</b> cao lớn oai phong!"},

  /* ---- Điểm xuyết: Gióng lớn lên như thế nào ---- */
  {type:"story", name:"Gióng lớn lên",
   scene:"Cả làng xúm lại nhìn chàng tráng sĩ vừa vươn vai, chẳng ai tin nổi. <b>Kể lại xem chuyện lạ này bắt đầu từ đâu.</b>",
   pieces:["giongts","giong","suga","vetchan"],
   panels:[
     {label:"Ngoài đồng", who:["me"],
      cue:"Bà mẹ ra đồng, thấy trên đất một <b>dấu lạ to tướng</b>, tò mò ướm thử bàn chân mình vào.",
      answer:"vetchan", after:"Về nhà bà mang thai, sinh ra một cậu bé khôi ngô."},
     {label:"Trong nhà, ba năm sau", who:["me"],
      cue:"Lên ba tuổi rồi mà <b>chẳng nói, chẳng cười</b>, đặt đâu nằm đấy.",
      answer:"giong", after:"Cả làng ai cũng thương, chẳng ai hiểu vì sao."},
     {label:"Ngoài ngõ", who:["giac1"],
      cue:"Giặc Ân tràn đến. Có tiếng rao vang khắp nơi: <i>“Ai tài giỏi, mau ra giúp nước cứu dân!”</i>",
      answer:"suga", after:"Nghe tiếng rao, cậu bé bỗng cất tiếng nói đầu tiên!"},
     {label:"Giữa sân", who:["lang"],
      cue:"Cơm cả làng, cà cả làng — ăn mãi vẫn thấy đói. Rồi <b>một cái vươn vai…</b>",
      answer:"giongts", after:"Bỗng thành tráng sĩ cao lớn oai phong!"}
   ],
   revealArt:"nguasat",
   reveal:"Ngựa sắt tới rồi!",
   story:"Tráng sĩ mặc giáp sắt, cầm roi sắt, nhảy phắt lên lưng ngựa. Ngựa hí một tiếng dài, phun lửa, phi thẳng ra nơi có giặc…"},

  {type:"place", name:"Ra trận", cols:5, rows:4,
   scene:"Giặc Ân <b>kéo đàn kéo lũ</b> tràn qua cổng làng! Tráng sĩ mặc giáp sắt, cầm roi sắt, <b>chặn ngay đầu giặc</b> — ngựa sắt bên cạnh phun lửa rừng rực!",
   env:[{id:"cong",cells:[[0,1]]},{id:"tre",cells:[[4,0]]},{id:"nui",cells:[[4,3]]},{id:"tangda",cells:[[2,0]]},{id:"cayda",cells:[[0,3]]},{id:"baico",cells:[[2,3]]},{id:"nha",cells:[[0,0]]},{id:"dinh",cells:[[4,1]]}], blocked:[], mud:[],
   chars:["giac1","giac2","giongts","nguasat"],
   cons:[{t:"queue",cs:["giac1","giac2"],txt:"Hai tên giặc bám sát nhau"},
         {t:"adjEnv",c:"giac1",e:"cong",txt:"Giặc tràn tới cổng làng"},
         {t:"adjChar",c:"giongts",target:"giac1",txt:"Tráng sĩ chặn ngay trước mặt giặc"},
         {t:"adjChar",c:"nguasat",target:"giongts",txt:"Ngựa sắt kề bên tráng sĩ"}],
   story:"Roi sắt vung đến đâu, giặc tan đến đấy! Nhưng đánh mãi… <b>“Rắc!”</b> — roi sắt <b>gãy đôi</b>. Tráng sĩ nhìn quanh — bên đường có một <b>bụi tre ngà</b>…"},

  {type:"place", name:"Nhổ tre ngà", cols:4, rows:3,
   scene:"Nhớ chưa — <i>“ai nhổ nổi cả bụi tre thì khoẻ như thần”</i>? Tráng sĩ bước tới, <b>nhổ bật cả bụi tre ngà</b> làm vũ khí! Giặc sợ vỡ mật, dạt hết ra xa…",
   env:[{id:"tre",cells:[[1,1]]},{id:"nui",cells:[[3,0]]},{id:"tangda",cells:[[0,0]]},{id:"baico",cells:[[3,2]]}], blocked:[], mud:[],
   relic:{id:"roisat",cell:[0,0]},
   chars:["giongts","nguasat","giac1","giac2"],
   cons:[{t:"onEnv",c:"giongts",e:"tre",txt:"Tráng sĩ nhổ cả bụi tre ngà"},
         {t:"adjEnv",c:"nguasat",e:"tre",txt:"Ngựa sắt đứng ngay bên"},
         {t:"queue",cs:["giac1","giac2"],txt:"Giặc giẫm đạp nhau tháo chạy nối đuôi"},
         {t:"adjEnv",c:"giac2",e:"nui",txt:"Tên chạy sau đã tới chân núi"}],
   story:"Tre ngà quật tan quân giặc! Đám tàn quân giẫm đạp lên nhau tháo chạy về nước. Đất nước sạch bóng giặc Ân."},

  {type:"place", name:"Về trời", cols:5, rows:3,
   scene:"Dẹp xong giặc, tráng sĩ một mình một ngựa lên <b>đỉnh núi Sóc</b>, cởi giáp sắt để lại, rồi cả người lẫn ngựa <b>từ từ bay về trời</b>. Vua nhớ ơn, lập <b>đền thờ</b> ngay quê nhà…",
   env:[{id:"nui",cells:[[4,0]]},{id:"dinh",cells:[[0,1]]},{id:"tre",cells:[[2,2]]}], blocked:[], mud:[],
   chars:["giongts","nguasat","vua","linh"],
   cons:[{t:"onEnv",c:"giongts",e:"nui",txt:"Tráng sĩ lên đỉnh núi Sóc"},
         {t:"adjEnv",c:"nguasat",e:"nui",txt:"Ngựa sắt theo chủ đến chân núi"},
         {t:"adjEnv",c:"vua",e:"dinh",txt:"Vua lập đền thờ, phong Phù Đổng Thiên Vương"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính hộ giá nhà vua"}],
   story:"Vua phong người là <b>Phù Đổng Thiên Vương</b>. Đến nay tre ngà vẫn vàng óng màu lửa, những ao hồ tròn quanh vùng — người ta bảo đó là <b>vết chân ngựa sắt</b> năm xưa.<br><b>— Hết chương 4 —</b><br>Còn những ngọn núi trùng điệp phía tây? Chuyện kể rằng trên đỉnh cao nhất có một <b>vị thần núi</b>… và dưới sông sâu, có kẻ ghen với ngài."},

]});
