/* ============================================================
   chapter7.js — Chương 7: Mai An Tiêm (7 màn)
   Sự tích quả dưa hấu — chương của TỰ LỰC: "của cho là của nợ".
   Đảo hoang = bàn cờ viền nước; điểm nhấn: quả dưa khắc tên
   TRÔI TRÊN NƯỚC (onEnv ao) — gửi thư theo sóng.
   ============================================================ */
window.CHAPTERS = window.CHAPTERS || [];

CHAPTERS.push({
  id: 7,
  name: "Chương 7 · Mai An Tiêm",
  levels: [

  {type:"place", name:"Của cho là của nợ", cols:5, rows:3,
   scene:"<b>Mai An Tiêm</b> là con nuôi được vua yêu quý nhất. Nhưng khi ai nấy tấm tắc đội ơn vua, chàng chỉ nói: <i>“Của biếu là của lo, <b>của cho là của nợ</b> — mọi thứ đều do bàn tay mình làm ra.”</i> Vua nghe được, <b>giận lắm, ngoảnh mặt đi</b>…",
   env:[{id:"cung",cells:[[0,0]]},{id:"nui",cells:[[4,0]]},{id:"tre",cells:[[4,2]]}], blocked:[], mud:[],
   chars:["vua","antiem","linh"],
   cons:[{t:"adjEnv",c:"vua",e:"cung",txt:"Vua ngự trước điện, mặt hướng vào trong"},
         {t:"behind",c:"antiem",target:"vua",txt:"Vua ngoảnh mặt — An Tiêm đứng sau lưng mà tâu"},
         {t:"adjChar",c:"linh",target:"vua",txt:"Lính hộ giá"}],
   story:"Vua phán: “Đã tin vào bàn tay mình, thì ra <b>đảo hoang</b> mà sống bằng bàn tay ấy!” — Cả nhà An Tiêm bị đày ra đảo, chỉ được mang theo ít lương khô và một con dao."},

  {type:"place", name:"Đảo hoang", cols:5, rows:4,
   scene:"Hòn đảo nhỏ giữa biển, <b>ba mặt là nước</b>. An Tiêm dựng <b>lều tranh</b>, vợ nhóm lửa, bé An níu áo mẹ. Không ai than một câu — bàn tay mình làm ra tất cả!",
   env:[{id:"leu",cells:[[1,1]]},{id:"tangda",cells:[[3,0]]},
        {id:"ao",cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[4,0],[4,1],[4,2]]}], blocked:[], mud:[],
   chars:["antiem","voat","beat"],
   cons:[{t:"adjEnv",c:"antiem",e:"leu",txt:"An Tiêm dựng lều tranh"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng nhóm lửa bên cạnh"},
         {t:"adjChar",c:"beat",target:"voat",txt:"Bé An níu áo mẹ"}],
   story:"Ngày qua ngày, hòn đảo hoang dần thành một mái nhà."},

  {type:"matrix", name:"Tay làm hàm nhai",
   scene:"Mỗi sáng, cả nhà toả đi ba ngả kiếm sống — <b>mỗi nơi một người</b>. Ai đi đâu?",
   rows:["antiem","voat","beat"], colsM:["baida","rungcay","suoi"],
   clues:[{t:"mIs", c:"antiem", col:"baida", txt:"An Tiêm ra bãi đá mò ngao bắt ốc"},
          {t:"mNot",c:"beat", col:"rungcay", txt:"Bé còn nhỏ, không được vào rừng một mình"},
          {t:"mUniq",txt:"Mỗi nơi chỉ có một người"}],
   story:"Chiều về, giỏ ốc đầy, bó rau tươi, ống nước mát — <i>tay làm hàm nhai</i>, chẳng thiếu thứ gì. Bỗng trên trời có <b>đàn chim trắng</b> từ phương tây bay tới…"},

  {type:"place", name:"Chim lạ thả hạt", cols:4, rows:3,
   scene:"Một con <b>chim trắng</b> đậu trên mỏm đá, thả xuống bãi mấy <b>hạt đen</b> lạ. An Tiêm muốn nhặt hạt — nhưng <b>khẽ thôi, đừng lại gần con chim</b> kẻo nó bay mất!",
   env:[{id:"tangda",cells:[[3,0]]},{id:"leu",cells:[[0,1]]},{id:"ao",cells:[[0,0]]}], blocked:[], mud:[],
   chars:["chimtrang","hatden","antiem"],
   cons:[{t:"onEnv",c:"chimtrang",e:"tangda",txt:"Chim trắng đậu trên mỏm đá"},
         {t:"adjChar",c:"antiem",target:"hatden",txt:"An Tiêm khẽ nhặt hạt lạ"},
         {t:"notAdjChar",c:"antiem",target:"chimtrang",txt:"…nhưng không lại gần con chim"}],
   story:"“Chim quý ăn được, hẳn người cũng trồng được!” — An Tiêm đem hạt đen <b>gieo xuống bãi cát</b>."},

  {type:"place", name:"Ruộng dưa", cols:5, rows:4,
   scene:"Dây leo bò lan xanh rờn khắp bãi, rồi đậu <b>quả nối quả</b> — vỏ xanh thẫm, to như cái vò! Xếp ba quả dưa <b>liền nhau theo dây</b>; An Tiêm vun gốc, vợ chăm ngọn.",
   env:[{id:"leu",cells:[[0,0]]},{id:"ao",cells:[[4,0],[4,1],[4,2],[4,3]]}], blocked:[], mud:[],
   relic:{id:"hatdua",cell:[0,3]},
   chars:["dua1","dua2","dua3","antiem","voat"],
   cons:[{t:"chain",cs:["dua1","dua2","dua3"],txt:"Dây dưa bò lan — quả nối quả LIỀN nhau"},
         {t:"adjChar",c:"antiem",target:"dua1",txt:"An Tiêm vun gốc"},
         {t:"adjChar",c:"voat",target:"dua3",txt:"Vợ chàng chăm phía ngọn"}],
   story:"Bổ thử một quả: ruột <b>đỏ au</b>, hạt đen nhánh, ngọt mát tận ruột gan! Chim ăn kêu “<i>tây qua, tây qua</i>” — cả nhà gọi luôn là <b>dưa tây qua</b>… chính là dưa hấu ngày nay."},

  {type:"place", name:"Thư theo sóng", cols:5, rows:4,
   scene:"Dưa nhiều ăn chẳng hết, mà đất liền thì xa… An Tiêm nghĩ ra một kế: <b>khắc tên mình lên vỏ dưa</b>, rồi ra mép sóng <b>thả dưa trôi ra biển</b> — quả dưa sẽ thay người đưa tin!",
   env:[{id:"leu",cells:[[0,0]]},{id:"tangda",cells:[[3,0]]},
        {id:"ao",cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3]]}], blocked:[], mud:[],
   chars:["antiem","duathu","voat"],
   cons:[{t:"adjEnv",c:"antiem",e:"ao",txt:"An Tiêm đứng sát mép sóng"},
         {t:"onEnv",c:"duathu",e:"ao",txt:"Quả dưa khắc tên TRÔI trên mặt nước!"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng thả thêm quả nữa"}],
   story:"Sóng đưa dưa đi… Một thuyền buôn vớt được quả dưa lạ ruột đỏ, đọc thấy dòng chữ khắc: <b>“Mai An Tiêm”</b>. Tiếng đồn theo thuyền về tận kinh đô — đến tai <b>vua</b>."},

  {type:"place", name:"Vua đón về", cols:5, rows:4,
   scene:"Vua nghe chuyện, lặng người: “Nó nói đúng — <b>bàn tay làm ra tất cả</b>. Ta sai rồi.” Vua sai <b>thuyền lớn</b> ra tận đảo. Lính chèo thuyền chờ dưới bến, vua bước lên bãi cát…",
   env:[{id:"thuyen",cells:[[4,2]]},{id:"leu",cells:[[0,0]]},
        {id:"ao",cells:[[4,0],[4,1],[2,3],[3,3],[4,3]]}], blocked:[], mud:[],
   chars:["vua","antiem","voat","beat","linh"],
   cons:[{t:"adjEnv",c:"vua",e:"thuyen",txt:"Vua bước từ thuyền lên bãi"},
         {t:"adjChar",c:"antiem",target:"vua",txt:"“Con ơi, ta sai rồi” — vua nắm tay An Tiêm"},
         {t:"adjChar",c:"voat",target:"antiem",txt:"Vợ chàng đứng bên"},
         {t:"adjChar",c:"beat",target:"voat",txt:"Bé An ôm chân mẹ"},
         {t:"onEnv",c:"linh",e:"thuyen",txt:"Lính giữ thuyền chờ dưới bến"}],
   story:"Cả nhà An Tiêm về lại đất liền, mang theo <b>giống dưa quý</b> — từ đó dưa hấu ruột đỏ truyền đi khắp nước.<br><b>— Hết chương 7 —</b><br>Đêm ấy thuyền về, <b>trăng tròn vành vạnh</b> trên biển. Nhìn kỹ mà xem — trên mặt trăng thấp thoáng bóng một <b>cây đa</b>, và hình như có ai đang ngồi dưới gốc…"},

]});
