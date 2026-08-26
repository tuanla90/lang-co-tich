/* ============================================================
   chapter6.js — Chương 6: Sự tích Trầu Cau (7 màn)
   Tân và Lang dùng chung một SVG — người chơi cũng không phân
   biệt nổi hai anh em, y như nàng Lưu. Chuyện buồn kể giọng dịu:
   mọi mất mát đều là "hoá thành", và kết là bộ ba mãi kề nhau.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 6,
  name: "Chương 6 · Sự tích Trầu Cau",
  levels: [

  {type:"place", name:"Hai giọt nước", cols:4, rows:3,
   scene:"Ngày xưa có hai anh em sinh đôi họ Cao — <b>Tân</b> là anh, <b>Lang</b> là em — giống nhau như <b>hai giọt nước</b> (nhìn kỹ mà xem, có phân biệt nổi không?). Cha mẹ mất sớm, hai anh em <b>như hình với bóng</b>, cùng đến nhà thầy đồ họ Lưu xin học.",
   env:[{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[3,2]]},{id:"cayda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["tan","lang","nangluu"],
   cons:[{t:"chain",cs:["tan","lang"],txt:"Anh em như hình với bóng — luôn KỀ nhau"},
         {t:"adjEnv",c:"tan",e:"nha",txt:"Đến nhà thầy xin học"},
         {t:"adjEnv",c:"nangluu",e:"nha",txt:"Con gái thầy — nàng Lưu — ra chào khách"}],
   story:"Nàng Lưu để ý ngay hai chàng học trò hiền lành… nhưng khổ nỗi, nàng <b>chẳng tài nào phân biệt nổi</b> ai là anh, ai là em!"},

  {type:"place", name:"Bát cơm một đôi đũa", cols:4, rows:3,
   scene:"Nàng nghĩ ra một kế: dọn cơm mời hai người mà chỉ để <b>MỘT bát cơm, MỘT đôi đũa</b> — rồi nấp sau bếp để ý. Người được <b>nhường ăn trước</b>… chính là anh!",
   env:[{id:"batcom",cells:[[1,1],[2,1]]},{id:"bepenv",cells:[[3,2]]},{id:"tre",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["tan","lang","nangluu"],
   cons:[{t:"adjEnv",c:"tan",e:"batcom",txt:"Người được mời ngồi vào ăn trước — là ANH"},
         {t:"adjChar",c:"lang",target:"tan",txt:"Người em đứng bên, hai tay nhường đũa"},
         {t:"hideIn",c:"nangluu",e:"bepenv",txt:"Nàng nấp sau bếp, lặng lẽ để ý"}],
   story:"“Ra người ấy là anh!” — Nàng thưa với cha, xin được kết duyên cùng <b>Tân</b>. Đám cưới vui cả một vùng. Nhưng từ ngày anh có vợ… người em bỗng thấy mình lẻ loi."},

  {type:"matrix", name:"Chào nhầm",
   scene:"Một chiều nọ — <b>mỗi người một nơi</b>: người còn mải ngoài đồng, người đứng đợi ở cổng, người trong nhà. Nàng Lưu chạy ra đón chồng… Đoán xem nàng gặp AI ở cổng?",
   rows:["tan","lang","nangluu"], colsM:["dong","conglang","nhatren"],
   clues:[{t:"mIs", c:"tan", col:"dong", txt:"Người anh còn mải cày nốt thửa ruộng, về sau"},
          {t:"mNot",c:"nangluu", col:"conglang", txt:"Nàng từ nhà trong chạy ra — đâu phải người đứng sẵn ở cổng"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"Nàng ôm chầm lấy người nơi cổng: “Mình về rồi!” — nhưng đó là… <b>Lang</b>! Ai nấy sượng sùng. Từ hôm ấy, người anh buồn buồn, người em <b>tủi thân</b> lắm."},

  {type:"place", name:"Lang bỏ đi", cols:5, rows:3,
   scene:"Nửa đêm, Lang lặng lẽ <b>bỏ nhà đi</b> — đi mãi, đi thật xa khỏi mái nhà, đến một <b>bờ suối lạ</b> thì ngồi xuống, ôm mặt khóc…",
   env:[{id:"nha",cells:[[2,1]]},{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"cayda",cells:[[2,0]]}], blocked:[], mud:[],
   chars:["lang"],
   cons:[{t:"adjEnv",c:"lang",e:"ao",txt:"Lang ngồi bên bờ suối, khóc mãi"},
         {t:"notAdjEnv",c:"lang",e:"nha",txt:"…thật xa mái nhà thân thuộc"}],
   story:"Sáng hôm sau, bên bờ suối chỉ còn một <b>tảng đá vôi trắng</b> — người em đã hoá đá, lặng im nghe suối chảy."},

  {type:"place", name:"Anh đi tìm em", cols:5, rows:3,
   scene:"Không thấy em đâu, Tân bỏ cả ăn ngủ <b>đi tìm</b>. Đến bờ suối nọ, chàng mỏi rã rời, ngồi tựa vào một <b>tảng đá trắng</b> ven nước — sao nghe thân thương lạ…",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"tangda",cells:[[2,1]]},{id:"tre",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["tan"],
   cons:[{t:"adjEnv",c:"tan",e:"tangda",txt:"Tân ngồi tựa vào tảng đá lạ"},
         {t:"adjEnv",c:"tan",e:"ao",txt:"…ngay bên bờ suối"}],
   story:"Chàng ngồi đó mãi không rời… rồi hoá thành một <b>cây cau</b> mọc thẳng tắp bên tảng đá, toả bóng che cho đá khỏi nắng."},

  {type:"place", name:"Nàng đi tìm chồng", cols:5, rows:3,
   scene:"Đến lượt nàng Lưu bỏ nhà <b>đi tìm chồng</b>. Đến bờ suối, thấy cây cau lạ bên tảng đá trắng, nàng ôm lấy thân cau mà khóc — <b>hãy đưa nàng LÊN cây cau</b>…",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"tangda",cells:[[3,1]]},{id:"caycau",cells:[[3,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["nangluu"],
   cons:[{t:"onEnv",c:"nangluu",e:"caycau",txt:"Nàng ôm chặt thân cau, không chịu rời"}],
   story:"Nàng hoá thành <b>dây trầu không</b>, lá xanh mướt, <b>quấn chặt quanh thân cau</b> — thế là ba người lại được ở bên nhau, mãi mãi."},

  /* ---- Điểm xuyết: ba người hoá ba thứ, mỗi thứ tựa vào thứ trước ---- */
  {type:"story", name:"Ba người hoá ba cây",
   scene:"Vua Hùng đi qua, nghe dân kể lại chuyện lạ bên bờ suối: ba người mất tích, ba thứ mọc lên. <b>Chạm vào một hình, rồi chạm vào khung tranh nó thuộc về.</b>",
   pieces:["caycau","daytrau","tangda"],
   panels:[
     {label:"Bờ suối, đêm đầu", who:["lang"],
      cue:"Người em đi mãi, tới bờ suối thì kiệt sức, ngồi khóc suốt đêm. Sáng ra chẳng thấy người đâu.",
      answer:"tangda", after:"Bên suối chỉ còn một tảng đá vôi trắng, lặng im nghe nước chảy."},
     {label:"Bờ suối, đêm sau", who:["tan"],
      cue:"Người anh đi tìm em, thấy <b>tảng đá lạ</b> bên suối thì ngồi tựa vào, không chịu rời.",
      answer:"caycau", after:"Chàng hoá cây cau, mọc thẳng tắp ngay bên tảng đá."},
     {label:"Bờ suối, đêm thứ ba", who:["nangluu"],
      cue:"Nàng đi tìm chồng, gặp <b>cây cau</b> mọc bên tảng đá, ôm lấy thân cây mà khóc.",
      answer:"daytrau", after:"Nàng hoá dây trầu, lá xanh mướt quấn chặt quanh thân cau."}
   ],
   revealArt:"caycau",
   reveal:"Ba người lại được ở bên nhau.",
   story:"Vua nghe xong, lặng người hồi lâu: “Ba người thương nhau đến thế…” — rồi sai lấy thử lá, quả và chút vôi từ đá."},

  {type:"place", name:"Miếng trầu đỏ thắm", cols:5, rows:3,
   scene:"Một hôm <b>vua Hùng</b> đi qua, nghe dân làng kể chuyện ba người, vua rưng rưng đứng lặng hồi lâu. Ba hoá thân giờ <b>mãi mãi kề nhau</b> bên bờ suối: tảng đá — cây cau — dây trầu.",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"dinh",cells:[[0,0]]},{id:"cayda",cells:[[0,2]]},{id:"tre",cells:[[2,2]]},{id:"caycau",cells:[[2,0]]}], blocked:[], mud:[],
   relic:{id:"miengtrau",cell:[0,2]},
   chars:["lang","tan","nangluu","vua","linh"],
   cons:[{t:"line",cs:["lang","tan","nangluu"],txt:"Ba người hoá đá đứng THẲNG một hàng"},
         {t:"adjEnv",c:"lang",e:"ao",txt:"Người anh đứng sát mép nước"},
         {t:"adjChar",c:"vua",target:"tan",txt:"Vua đứng cạnh Tân"},
         {t:"adjEnv",c:"linh",e:"dinh",txt:"Lính đứng phía sân đình"}],
   story:"Vua sai lấy <b>lá trầu</b> têm với <b>quả cau</b> và chút <b>vôi</b> từ đá, nhai thử — vị cay nồng ấm, nước <b>đỏ thắm như máu</b>! Vua truyền: từ nay việc cưới hỏi phải có trầu cau, cho tình nghĩa bền chặt.<br><b>— Hết chương 6 —</b><br><i>“Miếng trầu là đầu câu chuyện”</i> — mà chuyện làng thì còn dài… Ngoài khơi xa kia, có một hòn đảo nhỏ, nơi người ta kể về chàng trai bị đày đi với <b>hai bàn tay trắng</b>…"},

]});
