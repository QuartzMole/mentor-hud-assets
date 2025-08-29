/* help-hud/app.js — Resident Help HUD UI
   LSL injects: window.HUD_URL, window.CSRF_NONCE, window.LANG
   Posts via a hidden iframe (no page navigation).
*/

/* Translations FIRST */
const texts = {
  en:{title:"Request Mentor Help",instructions:"Please choose one or more topics where you need help.",topics:{how:"How Second Life works",exploring:"Exploring the world",meeting:"Meeting people/finding friends",freebies:"Finding freebies",avatar:"Avatar possibilities"},submit:"Submit",needOne:"Please select at least one topic.",sent:"Request sent!",thanks:"Thank you. A mentor will be in touch soon to help you. Please remain on the region until they contact you."},
  da:{title:"Anmod om mentorhjælp",instructions:"Vælg et eller flere emner, hvor du har brug for hjælp.",topics:{how:"Hvordan Second Life fungerer",exploring:"Udforske verdenen",meeting:"Møde folk / finde venner",freebies:"Finde gratis ting",avatar:"Avatar-muligheder"},submit:"Send",needOne:"Vælg mindst ét emne.",sent:"Anmodning sendt!",thanks:"Tak. En mentor vil snart kontakte dig for at hjælpe dig. Bliv venligst i regionen, indtil de kontakter dig."},
  de:{title:"Mentorenhilfe anfordern",instructions:"Bitte wählen Sie ein oder mehrere Themen aus, bei denen Sie Hilfe benötigen.",topics:{how:"Wie Second Life funktioniert",exploring:"Die Welt erkunden",meeting:"Leute treffen / Freunde finden",freebies:"Freebies finden",avatar:"Avatar-Möglichkeiten"},submit:"Absenden",needOne:"Bitte wähle mindestens ein Thema.",sent:"Anfrage gesendet!",thanks:"Danke. Ein Mentor wird sich bald mit Ihnen in Verbindung setzen, um Ihnen zu helfen. Bitte bleiben Sie in der Region, bis man Sie kontaktiert."},
  es:{title:"Solicitar ayuda de un mentor",instructions:"Elige uno o más temas en los que necesites ayuda.",topics:{how:"Cómo funciona Second Life",exploring:"Explorar el mundo",meeting:"Conocer gente / encontrar amigos",freebies:"Encontrar artículos gratis",avatar:"Posibilidades del avatar"},submit:"Enviar",needOne:"Selecciona al menos un tema.",sent:"¡Solicitud enviada!",thanks:"Gracias. Un mentor se pondrá en contacto contigo pronto para ayudarte. Por favor, permanece en la región hasta que te contacten."},
  fr:{title:"Demander l’aide d’un mentor",instructions:"Choisissez un ou plusieurs sujets pour lesquels vous avez besoin d’aide.",topics:{how:"Comment fonctionne Second Life",exploring:"Explorer le monde",meeting:"Rencontrer des gens / se faire des amis",freebies:"Trouver des objets gratuits",avatar:"Possibilités de l’avatar"},submit:"Envoyer",needOne:"Veuillez sélectionner au moins un sujet.",sent:"Demande envoyée !",thanks:"Merci. Un mentor vous contactera bientôt pour vous aider. Veuillez rester dans la région jusqu’à ce qu’on vous contacte."},
  it:{title:"Richiedi aiuto a un mentor",instructions:"Scegli uno o più argomenti per cui hai bisogno di aiuto.",topics:{how:"Come funziona Second Life",exploring:"Esplorare il mondo",meeting:"Conoscere persone / trovare amici",freebies:"Trovare oggetti gratuiti",avatar:"Possibilità dell’avatar"},submit:"Invia",needOne:"Seleziona almeno un argomento.",sent:"Richiesta inviata!",thanks:"Grazie. Un mentore ti contatterà presto per aiutarti. Per favore, rimani nella regione finché non ti contatta."},
  hu:{title:"Mentor segítség kérése",instructions:"Válassz egy vagy több témát, ahol segítségre van szükséged.",topics:{how:"Hogyan működik a Second Life",exploring:"A világ felfedezése",meeting:"Ismerkedés / barátok keresése",freebies:"Ingyenes dolgok keresése",avatar:"Avatar lehetőségek"},submit:"Küldés",needOne:"Válassz legalább egy témát.",sent:"Kérés elküldve!",thanks:"Köszönjük. Hamarosan egy mentor felveszi veled a kapcsolatot, hogy segítsen. Kérjük, maradj a régióban, amíg kapcsolatba nem lépnek veled."},
  nl:{title:"Mentorhulp aanvragen",instructions:"Kies één of meer onderwerpen waarbij je hulp nodig hebt.",topics:{how:"Hoe Second Life werkt",exploring:"De wereld verkennen",meeting:"Mensen ontmoeten / vrienden vinden",freebies:"Gratis spullen vinden",avatar:"Avatar-mogelijkheden"},submit:"Verzenden",needOne:"Selecteer minstens één onderwerp.",sent:"Verzoek verzonden!",thanks:"Bedankt. Een mentor neemt binnenkort contact met je op om je te helpen. Blijf alsjeblieft in de regio totdat er contact is opgenomen."},
  pl:{title:"Poproś o pomoc mentora",instructions:"Wybierz jeden lub więcej tematów, w których potrzebujesz pomocy.",topics:{how:"Jak działa Second Life",exploring:"Odkrywanie świata",meeting:"Poznawanie ludzi / szukanie przyjaciół",freebies:"Wyszukiwanie darmowych rzeczy",avatar:"Możliwości awatara"},submit:"Wyślij",needOne:"Wybierz co najmniej jeden temat.",sent:"Prośba wysłana!",thanks:"Dziękujemy. Mentor wkrótce skontaktuje się z Tobą, aby pomóc. Prosimy pozostać w regionie, aż się z Tobą skontaktują."},
  pt:{title:"Solicitar ajuda de um mentor",instructions:"Escolha um ou mais tópicos nos quais precisa de ajuda.",topics:{how:"Como o Second Life funciona",exploring:"Explorar o mundo",meeting:"Conhecer pessoas / fazer amigos",freebies:"Encontrar itens gratuitos",avatar:"Possibilidades do avatar"},submit:"Enviar",needOne:"Selecione pelo menos um tópico.",sent:"Pedido enviado!",thanks:"Obrigado. Um mentor entrará em contacto consigo em breve para ajudar. Por favor, permaneça na região até que entrem em contacto."},
  ru:{title:"Запросить помощь наставника",instructions:"Выберите одну или несколько тем, по которым вам нужна помощь.",topics:{how:"Как работает Second Life",exploring:"Исследование мира",meeting:"Знакомства / поиск друзей",freebies:"Поиск бесплатных вещей",avatar:"Возможности аватара"},submit:"Отправить",needOne:"Выберите хотя бы одну тему.",sent:"Запрос отправлен!",thanks:"Спасибо. Наставник скоро свяжется с вами, чтобы помочь. Пожалуйста, оставайтесь в регионе, пока с вами не свяжутся."},
  tr:{title:"Mentor yardımı iste",instructions:"Yardıma ihtiyaç duyduğun konuları seç.",topics:{how:"Second Life nasıl çalışır",exploring:"Dünyayı keşfetmek",meeting:"İnsanlarla tanışma / arkadaş bulma",freebies:"Ücretsiz eşyalar bulma",avatar:"Avatar olanakları"},submit:"Gönder",needOne:"En az bir konu seç.",sent:"İstek gönderildi!",thanks:"Teşekkürler. Bir mentor size yardımcı olmak için yakında iletişime geçecek. Lütfen size ulaşana kadar bölgede kalın."},
  uk:{title:"Запит на допомогу ментора",instructions:"Оберіть одну чи кілька тем, у яких вам потрібна допомога.",topics:{how:"Як працює Second Life",exploring:"Дослідження світу",meeting:"Знайомства / пошук друзів",freebies:"Пошук безкоштовних речей",avatar:"Можливості аватара"},submit:"Надіслати",needOne:"Виберіть щонайменше одну тему.",sent:"Запит надіслано!",thanks:"Дякуємо. Незабаром ментор зв’яжеться з вами, щоб допомогти. Будь ласка, залишайтеся в регіоні, доки з вами не зв’яжуться."},
  zh:{title:"请求导师帮助",instructions:"请选择一个或多个需要帮助的主题。",topics:{how:"Second Life 如何运作",exploring:"探索世界",meeting:"结识他人 / 交朋友",freebies:"寻找免费物品",avatar:"化身的可能性"},submit:"提交",needOne:"请至少选择一个主题。",sent:"请求已发送！",thanks:"谢谢。导师很快会联系您为您提供帮助。请在他们联系您之前留在该区域。"},
  ja:{title:"メンターへの支援依頼",instructions:"支援が必要なトピックを1つ以上選択してください。",topics:{how:"Second Life の仕組み",exploring:"世界を探検する",meeting:"人と出会う／友達を見つける",freebies:"フリー品を見つける",avatar:"アバターの可能性"},submit:"送信",needOne:"少なくとも1つ選択してください。",sent:"依頼を送信しました！",thanks:"ありがとうございます。まもなくメンターが連絡し、サポートします。連絡があるまで、このリージョンに留まってください。"},
  ko:{title:"멘토 도움 요청",instructions:"도움이 필요한 주제를 하나 이상 선택하세요.",topics:{how:"세컨드 라이프 작동 방식",exploring:"세상을 탐험하기",meeting:"사람 만나기 / 친구 찾기",freebies:"무료 아이템 찾기",avatar:"아바타 가능성"},submit:"제출",needOne:"최소 하나의 주제를 선택하세요.",sent:"요청이 전송되었습니다!",thanks:"감사합니다. 곧 멘토가 도와드리기 위해 연락드립니다. 연락을 받을 때까지 이 리전에서 기다려 주세요."}
};

function showSuccessScreen() {
  var t = texts[lang] || texts.en;
  var appEl = document.getElementById("app");
  if (appEl) {
    appEl.innerHTML =
      '<div class="success" role="status" aria-live="polite">' +
      t.thanks +
      "</div>";
    appEl.style.display = "block";
  }
}

function qpGet(key){
  var s = window.location.search || "";
  var re = new RegExp("[?&]"+key+"=([^&#]*)","i");
  var m = re.exec(s);
  return m ? decodeURIComponent(m[1].replace(/\+/g," ")) : null;
}

var injectedHUD = window.HUD_URL || null;
var queryHUD    = qpGet("cb");
var chosenHUD   = injectedHUD || queryHUD || "http://localhost:8000";
chosenHUD = chosenHUD.replace(/^https:\/\//i, "http://");
var HUD_URL = chosenHUD;

var NONCE = (qpGet("nonce") || window.CSRF_NONCE || "test-nonce");
var lang  = (window.LANG || qpGet("lang") || "en").toLowerCase();
var DEBUG = (/\bdebug=1\b/i.test(location.search) || !!window.DEBUG);

// keep the spinner visible for at least ms
function hideLoaderMin(ms) {
  if (typeof ms !== "number") ms = 700;
  var loader = document.getElementById("loader");
  if (!loader) return;
  var started = window.__HUD_LOADER_TS || Date.now();
  var elapsed = Date.now() - started;
  var wait = Math.max(0, ms - elapsed);
  setTimeout(function(){ loader.style.display = "none"; }, wait);
}

function render(){
  var t = texts[lang] || texts.en;
  var app = document.getElementById("app");
  if (!app) return;

  // reveal the UI and hide the spinner (after a tiny minimum display time)
  app.style.display = "block";
  hideLoaderMin(700);

  app.innerHTML =
    "<h1>" + t.title + "</h1>" +
    '<p id="instructions">' + t.instructions + "</p>" +
    '<form id="helpform">' +
      Object.keys(t.topics).map(function(code){
        return '<label><input type="checkbox" name="topic" value="' + code + '"> ' + t.topics[code] + "</label>";
      }).join("<br>") +
    '<br><button type="submit">' + t.submit + "</button>" +
    "</form>" +
    '<div id="result"></div>';

  var form = document.getElementById("helpform");
  var resultEl = document.getElementById("result");

  if (DEBUG && resultEl){
    resultEl.textContent =
      "Origin=" + location.origin + " | HUD_URL=" + HUD_URL + " | " +
      "injectedHUD=" + (injectedHUD ? injectedHUD : "nil") + " | " +
      "queryHUD=" + (queryHUD ? queryHUD : "nil") + " | nonce=" + NONCE;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var topics = Array.prototype.slice.call(document.querySelectorAll("input[name=topic]:checked"))
                  .map(function(i){ return i.value; });

    if (topics.length === 0) {
      resultEl.textContent = "⚠️ " + t.needOne;
      return;
    }

    // hidden iframe sink
    var sink = document.getElementById("hud_sink");
    if (!sink) {
      sink = document.createElement("iframe");
      sink.name = "hud_sink";
      sink.id = "hud_sink";
      sink.style.display = "none";
      document.body.appendChild(sink);
    }

    // classic POST form targeting the hidden iframe
    var f = document.createElement("form");
    f.method = "POST";
    f.action = HUD_URL + "?action=submit";
    f.target = "hud_sink";
    f.acceptCharset = "utf-8";

    var payload = document.createElement("input");
    payload.type = "hidden";
    payload.name = "json";
    payload.value = JSON.stringify({ nonce: NONCE, topics: topics });
    f.appendChild(payload);

    var echo = document.createElement("input");
    echo.type = "hidden";
    echo.name = "echo";
    echo.value = "ping";
    f.appendChild(echo);

    document.body.appendChild(f);

    if (DEBUG && resultEl) resultEl.textContent = "Posting to: " + f.action;

    // ---------- success handling (iframe load + postMessage) ----------
    var swapped = false;

    function finishSuccess() {
      if (swapped) return;
      swapped = true;
      sink.removeEventListener("load", onLoad);
      window.removeEventListener("message", onMsg);
      if (resultEl) resultEl.textContent = "";
      try { f.remove(); } catch(e) {}
      showSuccessScreen();
    }

    function onLoad() { finishSuccess(); }

    function onMsg(ev) {
      if (ev && ev.data === "help_ok") finishSuccess();
    }

    sink.addEventListener("load", onLoad);
    window.addEventListener("message", onMsg);

    // submit now
    try { f.submit(); }
    catch (err) {
      if (DEBUG && resultEl) resultEl.textContent = "❌ Network error.";
    }
  });
   window.__HUD_APP_BOOTED = true;

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
