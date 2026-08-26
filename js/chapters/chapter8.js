/* ============================================================
   chapter8.js — Chương 8: Chú Cuội (7 màn)
   Trả món nợ lore treo từ chương 1: "cây đa đầu làng — hình như
   có ai ngồi vắt vẻo trên đó…" — chính là Cuội, và cây đa chính
   là cây thuốc quý chàng trồng. Khép vòng tròn mùa 1.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 8,
  name: "Chương 8 · Chú Cuội",
  levels: [

  {type:"place", name:"Hổ và lá thần", cols:4, rows:3,
   scene:"Tiều phu <b>Cuội</b> vào rừng đốn củi thì chạm mặt… <b>hổ</b>! Chàng vội <b>nấp vào bụi tre</b> nín thở. Từ chỗ nấp, Cuội thấy chuyện lạ: hổ mẹ hái lá một <b>cây thuốc</b> nhai mớm cho hổ con nằm bên…",
   env:[{id:"tre",cells:[[0,1]]},{id:"caythuoc",cells:[[3,1]]},{id:"nui",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["cuoi","ho","hocon"],
   cons:[{t:"hideIn",c:"cuoi",e:"tre",txt:"Cuội nấp trong bụi tre, nín thở"},
         {t:"adjEnv",c:"ho",e:"caythuoc",txt:"Hổ mẹ hái lá cây thuốc"},
         {t:"adjChar",c:"hocon",target:"ho",txt:"Hổ con nằm bên mẹ"}],
   story:"Hổ con vừa nhai lá đã <b>bật dậy khoẻ re</b>! Đợi mẹ con hổ đi khuất, Cuội đào ngay cây thuốc nhỏ, gánh về <b>trồng ở đầu làng</b>."},

  {type:"place", name:"Lá thần cứu người", cols:4, rows:3,
   scene:"Tiếng lành đồn xa. Một hôm người ta vớt từ ao lên một <b>cô gái</b> đuối nước — Cuội hái lá thần chạy tới đắp. Con <b>chó vàng</b> chàng cứu hôm trước cứ quấn quýt bên chân…",
   env:[{id:"ao",cells:[[0,1],[0,2]]},{id:"caythuoc",cells:[[3,0]]},{id:"tre",cells:[[3,2]]},{id:"tangda",cells:[[1,0]]},{id:"cayda",cells:[[2,2]]}], blocked:[], mud:[],
   chars:["cogai","cuoi","cho"],
   cons:[{t:"adjEnv",c:"cogai",e:"ao",txt:"Cô gái vừa được vớt lên, nằm bên bờ ao"},
         {t:"adjChar",c:"cuoi",target:"cogai",txt:"Cuội đắp lá thần cứu người"},
         {t:"adjEnv",c:"cho",e:"caythuoc",txt:"Chó vàng nằm canh gốc cây thuốc"}],
   story:"Cô gái tỉnh lại, má hồng hào như chưa từng gặp nạn. Cảm ơn nghĩa cứu mạng, nàng <b>nên duyên vợ chồng</b> với Cuội."},

  {type:"matrix", name:"Lời dặn",
   scene:"Cuội dặn đi dặn lại: <i>“Cây quý lắm — có tưới thì tưới <b>nước TRONG</b>, chớ tưới nước bẩn mà cây <b>bay lên trời</b>!”</i> Mỗi sáng, <b>mỗi nơi một người</b>…",
   rows:["cuoi","vocuoi","cho"], colsM:["giengp","caythuocp","boao"],
   clues:[{t:"mIs", c:"cuoi", col:"giengp", txt:"Cuội chỉ gánh nước GIẾNG trong vắt về tưới cây"},
          {t:"mNot",c:"cho", col:"boao", txt:"Chó vàng ghét nước, chẳng bao giờ ra bờ ao — nó nằm giữ gốc cây"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"Còn vợ Cuội quen <b>giặt giũ bên ao</b>… mà nước ao thì đục ngầu. Nàng nghe lời dặn, gật gù — rồi quên ngay hôm sau."},

  {type:"place", name:"Nói dối như Cuội", cols:4, rows:3,
   scene:"Ở làng, Cuội nổi tiếng là chúa <b>nói đùa nói ngược</b> — “nói dối như Cuội” mà! Nghe chàng nói gì… <b>cứ hiểu ngược lại là đúng</b>:",
   env:[{id:"ao",cells:[[0,0]]},{id:"cayda",cells:[[2,0]]},{id:"tre",cells:[[0,2]]}], blocked:[], mud:[],
   chars:["cuoi","vocuoi"],
   cons:[{t:"onEnv",c:"cuoi",e:"cayda",txt:"Cuội bảo: “tôi GHÉT trèo cây nhất trần đời!” — ngược đấy: chàng ngồi vắt vẻo cả ngày"},
         {t:"notAdjEnv",c:"cuoi",e:"ao",txt:"Cuội bảo: “tôi mê đứng sát mép ao lắm!” — đừng tin!"},
         {t:"adjChar",c:"vocuoi",target:"cuoi",txt:"Cuội bảo: “vợ tôi chẳng thèm đứng gần tôi” — lại ngược nốt!"}],
   story:"Cả làng cười bò: “Đúng là <b>nói dối như Cuội</b>!” — mà lạ thay, ai cũng quý chàng. Có người để ý: dạo này đầu làng có <b>cây đa</b> lạ, và hình như <b>có ai hay ngồi vắt vẻo trên đó</b>…"},

  {type:"place", name:"Tưới nhầm!", cols:5, rows:4,
   scene:"Một chiều, Cuội còn <b>đốn củi tận rừng xa</b>. Ở nhà, vợ Cuội tiện tay xách xô <b>nước đục</b> ra tưới gốc cây quý… Con chó vàng sủa cuống quýt mà nàng không hiểu!",
   env:[{id:"caythuoc",cells:[[2,1]]},{id:"nha",cells:[[0,0]]},{id:"tre",cells:[[4,0],[4,1]]},{id:"cayda",cells:[[0,3]]},{id:"tangda",cells:[[4,3]]}], blocked:[], mud:[[1,1],[1,2]],
   chars:["cuoi","vocuoi","cho"],
   cons:[{t:"adjEnv",c:"cuoi",e:"tre",txt:"Cuội đốn củi tận rừng xa"},
         {t:"notAdjEnv",c:"cuoi",e:"caythuoc",txt:"…không kịp cản rồi!"},
         {t:"adjEnv",c:"vocuoi",e:"caythuoc",txt:"Vợ Cuội xách xô nước đục ra tưới cây"},
         {t:"behind",c:"cho",target:"vocuoi",txt:"Chó vàng sủa cuống quýt sau lưng"}],
   story:"Nước đục vừa ngấm xuống — mặt đất <b>rùng rùng chuyển động</b>. Gốc cây long dần… long dần… rồi cả cây <b>từ từ nhấc khỏi mặt đất</b>, bay lên!"},

  {type:"place", name:"Níu rễ cây", cols:4, rows:4,
   scene:"Cuội về tới đầu làng, thấy cây thuốc đang <b>lơ lửng bay lên</b>! Chàng quăng gánh củi, lao tới <b>níu chặt chùm rễ</b> — nhưng cây khoẻ hơn, kéo cả người <b>bay theo</b>. Vợ và chó vàng đứng dưới, với không tới nữa…",
   env:[{id:"cayda",cells:[[1,1]]},{id:"nha",cells:[[3,3]]},{id:"tre",cells:[[0,0]]},{id:"tangda",cells:[[3,0]]}], blocked:[], mud:[],
   chars:["cuoi","vocuoi","cho"],
   cons:[{t:"onEnv",c:"cuoi",e:"cayda",txt:"Cuội níu chặt rễ — cây kéo cả người lên!"},
         {t:"adjEnv",c:"vocuoi",e:"nha",txt:"Vợ đứng ở cửa nhà nhìn theo"},
         {t:"adjChar",c:"cho",target:"vocuoi",txt:"Con chó vàng nép bên chân"}],
   story:"Cây bay mãi, bay mãi — qua ngọn tre, qua đỉnh núi, lên tận <b>cung trăng</b> — rồi đáp xuống, mọc rễ ở đó, mang theo cả chú Cuội."},

  /* ---- Điểm xuyết: vì sao chú Cuội lại ngồi trên cung trăng ---- */
  {type:"story", name:"Vì sao Cuội lên trăng",
   scene:"Cây đa đã đáp xuống cung trăng. Cuội ngồi dưới gốc, nhớ lại đầu đuôi. <b>Xếp lại xem chuyện bắt đầu từ đâu.</b>",
   pieces:["vocuoi","caythuoc","cayda","cuoi"],
   panels:[
     {label:"Trong rừng", who:["hocon"],
      cue:"Hổ mẹ nhai một thứ lá đắp cho con — hổ con đang thiêm thiếp bỗng bật dậy khoẻ re.",
      answer:"caythuoc", after:"Đợi mẹ con hổ đi khuất, Cuội đào ngay cây thuốc mang về trồng."},
     {label:"Bên bờ ao", who:["cogai"],
      cue:"Người vừa được vớt dưới ao lên đã tỉnh lại, má hồng hào như chưa từng gặp nạn. Ai đắp lá?",
      answer:"cuoi", after:"Cảm ơn nghĩa cứu mạng, nàng nên duyên vợ chồng với chàng."},
     {label:"Góc vườn", who:["cho"],
      cue:"Lời dặn chỉ có một câu: tưới nước TRONG thôi. Vậy mà ai quen giặt bên ao, xách nhầm xô nước đục?",
      answer:"vocuoi", after:"Nước đục vừa ngấm, mặt đất rùng rùng chuyển động."},
     {label:"Giữa trời", who:["vocuoi"],
      cue:"Gốc long dần… rồi cả cây bật khỏi đất bay lên. Cuội chạy tới, níu vội lấy thứ gì?",
      answer:"cayda", after:"Rễ cây kéo chàng lên theo, cao mãi, cao mãi…"}
   ],
   revealArt:"cuoi",
   reveal:"Thế là Cuội theo cây lên tận cung trăng.",
   story:"Cuội thở dài, ngước nhìn xuống mặt đất xa tít: “Giá hôm ấy mình dặn kỹ hơn một chút…”"},

  {type:"place", name:"Cung trăng", cols:4, rows:3,
   scene:"Trên cung trăng lặng lẽ, cây đa mọc rễ giữa nền đá bạc. Cuội ngồi xuống gốc cây, nhìn về phía quê nhà xa tít… <i>“Chú Cuội ngồi gốc cây đa…”</i>",
   env:[{id:"cayda",cells:[[1,1]]},{id:"tangda",cells:[[3,2]]}], blocked:[], mud:[],
   extras:[{c:"chihang",cell:[3,0],note:"Chị Hằng sang chào người hàng xóm mới"}],
   relic:{id:"lathuoc",cell:[0,2]},
   chars:["cuoi"],
   cons:[{t:"onEnv",c:"cuoi",e:"cayda",txt:"Chú Cuội ngồi gốc cây đa…"}],
   story:"Từ đó, cứ đêm rằm nhìn lên trăng, ta lại thấy <b>bóng cây đa và chú Cuội</b> ngồi dưới gốc. Trung thu, trẻ con rước đèn, hát: <i>“Chú Cuội ngồi gốc cây đa, để trâu ăn lúa gọi cha ời ời…”</i><br><b>— Hết chương 8 —</b><br>Từ cung trăng nhìn xuống, Cuội thấy cả làng mình: Tấm têm trầu bên quán nước, Bờm phe phẩy quạt mo, luỹ tre ngà vàng óng như lửa… Và ngoài khơi xa, những <b>cánh buồm lạ</b> đang chầm chậm hướng về bến làng."},

]});
