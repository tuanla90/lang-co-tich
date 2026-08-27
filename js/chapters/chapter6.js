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
   scene:"@c6.haigiotnuoc.scene",
   env:[{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[3,2]]},{id:"cayda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["tan","lang","nangluu"],
   cons:[{t:"chain",cs:["tan","lang"],txt:"Anh em như hình với bóng — luôn KỀ nhau"},
         {t:"adjEnv",c:"tan",e:"nha",txt:"Đến nhà thầy xin học"},
         {t:"adjEnv",c:"nangluu",e:"nha",txt:"Con gái thầy — nàng Lưu — ra chào khách"}],
   story:"@c6.haigiotnuoc.story"},

  {type:"place", name:"Bát cơm một đôi đũa", cols:4, rows:3,
   scene:"@c6.batcommotdoidu.scene",
   env:[{id:"batcom",cells:[[1,1],[2,1]]},{id:"bepenv",cells:[[3,2]]},{id:"tre",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["tan","lang","nangluu"],
   cons:[{t:"adjEnv",c:"tan",e:"batcom",txt:"Người được mời ngồi vào ăn trước — là ANH"},
         {t:"adjChar",c:"lang",target:"tan",txt:"Người em đứng bên, hai tay nhường đũa"},
         {t:"hideIn",c:"nangluu",e:"bepenv",txt:"Nàng nấp sau bếp, lặng lẽ để ý"}],
   story:"@c6.batcommotdoidu.story"},

  {type:"matrix", name:"Chào nhầm",
   scene:"@c6.chaonham.scene",
   rows:["tan","lang","nangluu"], colsM:["dong","conglang","nhatren"],
   clues:[{t:"mIs", c:"tan", col:"dong", txt:"Người anh còn mải cày nốt thửa ruộng, về sau"},
          {t:"mNot",c:"nangluu", col:"conglang", txt:"Nàng từ nhà trong chạy ra — đâu phải người đứng sẵn ở cổng"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"@c6.chaonham.story"},

  {type:"place", name:"Lang bỏ đi", cols:5, rows:3,
   scene:"@c6.langbodi.scene",
   env:[{id:"nha",cells:[[2,1]]},{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"cayda",cells:[[2,0]]}], blocked:[], mud:[],
   chars:["lang"],
   cons:[{t:"adjEnv",c:"lang",e:"ao",txt:"Lang ngồi bên bờ suối, khóc mãi"},
         {t:"notAdjEnv",c:"lang",e:"nha",txt:"…thật xa mái nhà thân thuộc"}],
   story:"@c6.langbodi.story"},

  {type:"place", name:"Anh đi tìm em", cols:5, rows:3,
   scene:"@c6.anhditimem.scene",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"tangda",cells:[[2,1]]},{id:"tre",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["tan"],
   cons:[{t:"adjEnv",c:"tan",e:"tangda",txt:"Tân ngồi tựa vào tảng đá lạ"},
         {t:"adjEnv",c:"tan",e:"ao",txt:"…ngay bên bờ suối"}],
   story:"@c6.anhditimem.story"},

  {type:"place", name:"Nàng đi tìm chồng", cols:5, rows:3,
   scene:"@c6.nangditimchong.scene",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"tangda",cells:[[3,1]]},{id:"caycau",cells:[[3,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["nangluu"],
   cons:[{t:"onEnv",c:"nangluu",e:"caycau",txt:"Nàng ôm chặt thân cau, không chịu rời"}],
   story:"@c6.nangditimchong.story"},

  /* ---- Điểm xuyết: ba người hoá ba thứ, mỗi thứ tựa vào thứ trước ---- */
  {type:"story", name:"Ba người hoá ba cây",
   scene:"@c6.banguoihoabaca.scene",
   pieces:["caycau","daytrau","tangda"],
   panels:[
     {label:"@c6.banguoihoabaca.p1.label", who:["lang"],
      cue:"@c6.banguoihoabaca.p1.cue",
      answer:"tangda", after:"@c6.banguoihoabaca.p1.after"},
     {label:"@c6.banguoihoabaca.p2.label", who:["tan"],
      cue:"@c6.banguoihoabaca.p2.cue",
      answer:"caycau", after:"@c6.banguoihoabaca.p2.after"},
     {label:"@c6.banguoihoabaca.p3.label", who:["nangluu"],
      cue:"@c6.banguoihoabaca.p3.cue",
      answer:"daytrau", after:"@c6.banguoihoabaca.p3.after"}
   ],
   revealArt:"caycau",
   reveal:"@c6.banguoihoabaca.reveal",
   story:"@c6.banguoihoabaca.story"},

  {type:"place", name:"Miếng trầu đỏ thắm", cols:5, rows:3,
   scene:"@c6.miengtraudotha.scene",
   env:[{id:"ao",cells:[[4,0],[4,1],[4,2]]},{id:"dinh",cells:[[0,0]]},{id:"cayda",cells:[[0,2]]},{id:"tre",cells:[[2,2]]},{id:"caycau",cells:[[2,0]]}], blocked:[], mud:[],
   relic:{id:"miengtrau",cell:[0,2]},
   chars:["lang","tan","nangluu","vua","linh"],
   cons:[{t:"line",cs:["lang","tan","nangluu"],txt:"Ba người hoá đá đứng THẲNG một hàng"},
         {t:"adjEnv",c:"lang",e:"ao",txt:"Người anh đứng sát mép nước"},
         {t:"adjChar",c:"vua",target:"tan",txt:"Vua đứng cạnh Tân"},
         {t:"adjEnv",c:"linh",e:"dinh",txt:"Lính đứng phía sân đình"}],
   story:"@c6.miengtraudotha.story"},

]});
