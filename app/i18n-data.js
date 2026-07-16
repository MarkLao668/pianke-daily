(function attachI18n(root, factory) {
  const value = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = value;
  if (root) root.PIANKE_I18N = value;
})(typeof window !== "undefined" ? window : null, function createI18n() {
  const locales = {
    "zh-CN": {
      label: "简体中文", lang: "zh-CN", dir: "ltr",
      weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      lines: ["枫落茶烟轻", "山路入云深", "听雨过竹", "空庭闻钟", "水驿灯初上", "帘幕后有风", "月过千重瓦"],
      credits: ["枫庭 · 雨歇", "山关 · 晨雾", "竹林 · 听雨", "古寺 · 钟影", "水驿 · 暮色", "戏台 · 候场", "重檐 · 夜行"],
      modernLines: ["雨停在无人的站台", "白墙之外，海仍沉默", "雾把机器变得遥远", "黑岩之间，风没有回答", "玻璃里的人走向另一边", "公路在地平线前转弯", "房间留下两把空椅"],
      modernCredits: ["黄色车站 · 微雨", "白墙海岸 · 午后", "工业雾港 · 晨霭", "黑岩孤岛 · 阴天", "玻璃长廊 · 倒影", "荒原公路 · 远海", "空置公寓 · 日光"],
      strings: {
        appName: "片刻日程", localOffline: "本地保存 · 不联网", oneDayOneScene: "一日 · 一幕", language: "语言", theme: "风格", classicalTheme: "古典风格", modernTheme: "现代风格", modernClockLabel: "此刻", today: "回到今日",
        dateCaption: "今日场记", titleLabel: "今 日 题 签", titlePlaceholder: "给今天取一个片名……", voiceoverPlaceholder: "写下一句旁白……",
        storyboard: "今 日 分 镜", tasks: "要做的事", time: "时间", newTask: "写下一件要完成的事……", add: "添一笔",
        saved: "已落笔", saving: "正在落笔", unsaved: "未保存", dataLocation: "数据位置", backup: "备份", backupDone: "备份完成",
        emptyTitle: "此幕尚无分镜", emptyHint: "从一件小事起笔，让今日缓缓显影。", genericError: "刚才没有保存成功，请再试一次。",
        weekNav: "本周日期", previousDay: "前一天", nextDay: "后一天", clockLabel: "漏刻", scene: "幕",
        complete: "完成", reopen: "取消完成", remove: "删除", taskNote: "的备注", taskItem: "件事项", hourWord: "时", firstQuarter: "初刻", quarterWord: "刻"
      }
    },
    "zh-TW": {
      label: "繁體中文", lang: "zh-TW", dir: "ltr",
      weekdays: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
      lines: ["楓落茶煙輕", "山路入雲深", "聽雨過竹", "空庭聞鐘", "水驛燈初上", "簾幕後有風", "月過千重瓦"],
      credits: ["楓庭 · 雨歇", "山關 · 晨霧", "竹林 · 聽雨", "古寺 · 鐘影", "水驛 · 暮色", "戲臺 · 候場", "重簷 · 夜行"],
      modernLines: ["雨停在無人的月臺", "白牆之外，海仍沉默", "霧把機器變得遙遠", "黑岩之間，風沒有回答", "玻璃裡的人走向另一邊", "公路在地平線前轉彎", "房間留下兩把空椅"],
      modernCredits: ["黃色車站 · 微雨", "白牆海岸 · 午後", "工業霧港 · 晨靄", "黑岩孤島 · 陰天", "玻璃長廊 · 倒影", "荒原公路 · 遠海", "空置公寓 · 日光"],
      strings: {
        appName: "片刻日程", localOffline: "本機儲存 · 不連網", oneDayOneScene: "一日 · 一幕", language: "語言", theme: "風格", classicalTheme: "古典風格", modernTheme: "現代風格", modernClockLabel: "此刻", today: "回到今日",
        dateCaption: "今日場記", titleLabel: "今 日 題 簽", titlePlaceholder: "給今天取一個片名……", voiceoverPlaceholder: "寫下一句旁白……",
        storyboard: "今 日 分 鏡", tasks: "要做的事", time: "時間", newTask: "寫下一件要完成的事……", add: "添一筆",
        saved: "已落筆", saving: "正在落筆", unsaved: "未儲存", dataLocation: "資料位置", backup: "備份", backupDone: "備份完成",
        emptyTitle: "此幕尚無分鏡", emptyHint: "從一件小事起筆，讓今日緩緩顯影。", genericError: "剛才沒有儲存成功，請再試一次。",
        weekNav: "本週日期", previousDay: "前一天", nextDay: "後一天", clockLabel: "漏刻", scene: "幕",
        complete: "完成", reopen: "取消完成", remove: "刪除", taskNote: "的備註", taskItem: "件事項", hourWord: "時", firstQuarter: "初刻", quarterWord: "刻"
      }
    },
    en: {
      label: "English", lang: "en", dir: "ltr",
      weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      lines: ["Maple falls, tea smoke rises", "The mountain path enters deep clouds", "Rain passing through bamboo", "A bell across the empty court", "Lamps wake at the waterside inn", "Wind waits behind the curtain", "Moon over a thousand tiles"],
      credits: ["Maple court · After rain", "Mountain pass · Dawn mist", "Bamboo grove · Rain", "Old temple · Bell shadow", "Waterside inn · Dusk", "Opera stage · Before entrance", "Tiled roofs · Night journey"],
      modernLines: ["Rain lingers on the empty platform", "Beyond the white wall, the sea stays silent", "Fog makes the machines distant", "Among black rocks, the wind gives no answer", "The figure in glass walks to the other side", "The road turns before the horizon", "The room keeps two empty chairs"],
      modernCredits: ["Yellow station · Light rain", "White coast · Afternoon", "Industrial harbor · Morning haze", "Black-rock island · Overcast", "Glass corridor · Reflections", "Wasteland road · Far sea", "Vacant apartment · Daylight"],
      strings: {
        appName: "Daily Scene", localOffline: "Saved locally · Offline", oneDayOneScene: "One day · One scene", language: "Language", theme: "Theme", classicalTheme: "Classical", modernTheme: "Modern", modernClockLabel: "LOCAL TIME", today: "Today",
        dateCaption: "TODAY'S SCENE", titleLabel: "TODAY'S TITLE", titlePlaceholder: "Give today a title…", voiceoverPlaceholder: "Write one line of voice-over…",
        storyboard: "TODAY'S SHOTS", tasks: "Things to do", time: "Time", newTask: "Write down something to finish…", add: "Add",
        saved: "Saved", saving: "Saving", unsaved: "Not saved", dataLocation: "Data location", backup: "Backup", backupDone: "Backup complete",
        emptyTitle: "No shots in this scene yet", emptyHint: "Begin with one small thing and let the day develop.", genericError: "That was not saved. Please try again.",
        weekNav: "Dates this week", previousDay: "Previous day", nextDay: "Next day", clockLabel: "DOUBLE HOUR", scene: "SCENE",
        complete: "Complete", reopen: "Mark incomplete", remove: "Delete", taskNote: " note", taskItem: "task", hourWord: "hour", firstQuarter: "opening quarter", quarterWord: "quarter"
      }
    },
    ja: {
      label: "日本語", lang: "ja", dir: "ltr",
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      lines: ["楓散り 茶煙かすか", "山路 雲深く", "竹に雨を聴く", "空庭に鐘", "水駅 灯ともる", "幕裏に風", "月 千瓦を渡る"],
      credits: ["楓の庭 · 雨上がり", "山の関 · 朝霧", "竹林 · 雨音", "古寺 · 鐘の影", "水辺の宿 · 夕暮れ", "舞台 · 開幕前", "重なる甍 · 夜行"],
      modernLines: ["雨は無人のホームに残る", "白い壁の向こうで海は黙る", "霧が機械を遠ざける", "黒い岩の間で風は答えない", "ガラスの人影は向こう側へ", "道は地平線の手前で曲がる", "部屋に二脚の椅子が残る"],
      modernCredits: ["黄色い駅 · 小雨", "白い海岸 · 午後", "工業港 · 朝霧", "黒岩の島 · 曇天", "ガラス回廊 · 反射", "荒野の道 · 遠い海", "空室 · 日差し"],
      strings: {
        appName: "一幕日程", localOffline: "端末に保存 · オフライン", oneDayOneScene: "一日 · 一幕", language: "言語", theme: "テーマ", classicalTheme: "古典", modernTheme: "モダン", modernClockLabel: "現在時刻", today: "今日へ",
        dateCaption: "今日の場記", titleLabel: "今 日 の 題", titlePlaceholder: "今日に題をつける……", voiceoverPlaceholder: "ひとことの語りを書く……",
        storyboard: "今 日 の 絵 組", tasks: "すること", time: "時刻", newTask: "今日することを書く……", add: "一筆加える",
        saved: "保存済み", saving: "保存中", unsaved: "未保存", dataLocation: "データ場所", backup: "バックアップ", backupDone: "保存完了",
        emptyTitle: "この幕はまだ空白", emptyHint: "小さな一事から、今日をゆっくり現像する。", genericError: "保存できませんでした。もう一度お試しください。",
        weekNav: "今週の日付", previousDay: "前の日", nextDay: "次の日", clockLabel: "漏刻", scene: "幕",
        complete: "完了", reopen: "未完了に戻す", remove: "削除", taskNote: "のメモ", taskItem: "件目", hourWord: "の刻", firstQuarter: "初刻", quarterWord: "刻"
      }
    },
    ko: {
      label: "한국어", lang: "ko", dir: "ltr",
      weekdays: ["일", "월", "화", "수", "목", "금", "토"],
      lines: ["단풍 지고 차 연기 가볍다", "산길은 구름 깊이", "대숲에 비를 듣다", "빈 뜰에 종소리", "물가 객잔에 등불", "막 뒤에 바람", "달은 천 겹 기와를 넘고"],
      credits: ["단풍 뜰 · 비 갠 뒤", "산관 · 새벽 안개", "대숲 · 빗소리", "고찰 · 종 그림자", "물가 객잔 · 해질녘", "무대 · 개막 전", "겹지붕 · 밤길"],
      modernLines: ["비는 빈 승강장에 머문다", "흰 벽 너머 바다는 침묵한다", "안개가 기계를 멀게 한다", "검은 바위 사이 바람은 답이 없다", "유리 속 사람은 건너편으로 간다", "도로는 수평선 앞에서 굽는다", "방에는 빈 의자 둘만 남는다"],
      modernCredits: ["노란 역 · 가랑비", "흰 해안 · 오후", "산업 항구 · 아침 안개", "검은 바위섬 · 흐림", "유리 복도 · 반사", "황야 도로 · 먼 바다", "빈 아파트 · 햇빛"],
      strings: {
        appName: "하루의 장면", localOffline: "기기에 저장 · 오프라인", oneDayOneScene: "하루 · 한 장면", language: "언어", theme: "테마", classicalTheme: "고전", modernTheme: "현대", modernClockLabel: "현재 시각", today: "오늘로",
        dateCaption: "오늘의 장면", titleLabel: "오 늘 의 제 목", titlePlaceholder: "오늘의 제목을 지어 보세요…", voiceoverPlaceholder: "한 줄의 내레이션을 적어 보세요…",
        storyboard: "오 늘 의 숏", tasks: "할 일", time: "시간", newTask: "오늘 끝낼 일을 적어 보세요…", add: "추가",
        saved: "저장됨", saving: "저장 중", unsaved: "저장 안 됨", dataLocation: "데이터 위치", backup: "백업", backupDone: "백업 완료",
        emptyTitle: "아직 장면이 없습니다", emptyHint: "작은 일 하나로 오늘을 천천히 현상하세요.", genericError: "저장하지 못했습니다. 다시 시도해 주세요.",
        weekNav: "이번 주 날짜", previousDay: "이전 날", nextDay: "다음 날", clockLabel: "누각", scene: "장면",
        complete: "완료", reopen: "미완료로", remove: "삭제", taskNote: " 메모", taskItem: "번째 일", hourWord: "시", firstQuarter: "초각", quarterWord: "각"
      }
    },
    es: {
      label: "Español", lang: "es", dir: "ltr",
      weekdays: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
      lines: ["Cae el arce, sube el té", "El sendero entra en las nubes", "Lluvia entre bambúes", "Una campana en el patio vacío", "Se encienden luces junto al agua", "Viento detrás del telón", "Luna sobre mil tejas"],
      credits: ["Jardín de arces · Tras la lluvia", "Paso de montaña · Niebla", "Bambusal · Lluvia", "Templo antiguo · Campana", "Posada del agua · Ocaso", "Escenario · Antes de entrar", "Tejados · Viaje nocturno"],
      modernLines: ["La lluvia queda en el andén vacío", "Tras el muro blanco, el mar calla", "La niebla aleja las máquinas", "Entre rocas negras, el viento no responde", "La figura del cristal cruza al otro lado", "La carretera gira antes del horizonte", "La habitación guarda dos sillas vacías"],
      modernCredits: ["Estación amarilla · Llovizna", "Costa blanca · Tarde", "Puerto industrial · Bruma", "Isla de roca negra · Nublado", "Pasillo de cristal · Reflejos", "Carretera yerma · Mar lejano", "Piso vacío · Luz diurna"],
      strings: {
        appName: "Escena diaria", localOffline: "Guardado local · Sin conexión", oneDayOneScene: "Un día · Una escena", language: "Idioma", theme: "Estilo", classicalTheme: "Clásico", modernTheme: "Moderno", modernClockLabel: "HORA LOCAL", today: "Hoy",
        dateCaption: "ESCENA DE HOY", titleLabel: "TÍTULO DE HOY", titlePlaceholder: "Ponle un título al día…", voiceoverPlaceholder: "Escribe una línea de narración…",
        storyboard: "PLANOS DE HOY", tasks: "Tareas", time: "Hora", newTask: "Escribe algo que quieras terminar…", add: "Añadir",
        saved: "Guardado", saving: "Guardando", unsaved: "Sin guardar", dataLocation: "Ubicación de datos", backup: "Copia", backupDone: "Copia terminada",
        emptyTitle: "Aún no hay planos", emptyHint: "Empieza por algo pequeño y deja que el día se revele.", genericError: "No se ha guardado. Inténtalo de nuevo.",
        weekNav: "Fechas de la semana", previousDay: "Día anterior", nextDay: "Día siguiente", clockLabel: "DOBLE HORA", scene: "ESCENA",
        complete: "Completar", reopen: "Marcar pendiente", remove: "Eliminar", taskNote: " nota", taskItem: "tarea", hourWord: "hora", firstQuarter: "cuarto inicial", quarterWord: "cuarto"
      }
    },
    fr: {
      label: "Français", lang: "fr", dir: "ltr",
      weekdays: ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"],
      lines: ["L'érable tombe, le thé fume", "Le sentier entre dans les nuages", "Pluie à travers les bambous", "Une cloche dans la cour vide", "Les lanternes s'allument sur l'eau", "Le vent derrière le rideau", "La lune sur mille tuiles"],
      credits: ["Jardin d'érables · Après la pluie", "Col · Brume du matin", "Bambouseraie · Pluie", "Vieux temple · Ombre de cloche", "Auberge d'eau · Crépuscule", "Scène · Avant l'entrée", "Toits · Voyage nocturne"],
      modernLines: ["La pluie demeure sur le quai désert", "Au-delà du mur blanc, la mer se tait", "Le brouillard éloigne les machines", "Entre les roches noires, le vent ne répond pas", "La silhouette dans le verre passe de l'autre côté", "La route tourne avant l'horizon", "La pièce garde deux chaises vides"],
      modernCredits: ["Gare jaune · Pluie fine", "Côte blanche · Après-midi", "Port industriel · Brume", "Île de roche noire · Ciel couvert", "Galerie de verre · Reflets", "Route déserte · Mer lointaine", "Appartement vide · Lumière du jour"],
      strings: {
        appName: "Scène du jour", localOffline: "Enregistré ici · Hors ligne", oneDayOneScene: "Un jour · Une scène", language: "Langue", theme: "Style", classicalTheme: "Classique", modernTheme: "Moderne", modernClockLabel: "HEURE LOCALE", today: "Aujourd'hui",
        dateCaption: "SCÈNE DU JOUR", titleLabel: "TITRE DU JOUR", titlePlaceholder: "Donnez un titre à ce jour…", voiceoverPlaceholder: "Écrivez une phrase de voix off…",
        storyboard: "PLANS DU JOUR", tasks: "À faire", time: "Heure", newTask: "Écrivez une chose à terminer…", add: "Ajouter",
        saved: "Enregistré", saving: "Enregistrement", unsaved: "Non enregistré", dataLocation: "Emplacement", backup: "Sauvegarde", backupDone: "Sauvegarde terminée",
        emptyTitle: "Aucun plan dans cette scène", emptyHint: "Commencez par une petite chose et laissez le jour se révéler.", genericError: "Impossible d'enregistrer. Réessayez.",
        weekNav: "Dates de la semaine", previousDay: "Jour précédent", nextDay: "Jour suivant", clockLabel: "HEURE DOUBLE", scene: "SCÈNE",
        complete: "Terminer", reopen: "Rouvrir", remove: "Supprimer", taskNote: " note", taskItem: "tâche", hourWord: "heure", firstQuarter: "premier quart", quarterWord: "quart"
      }
    },
    de: {
      label: "Deutsch", lang: "de", dir: "ltr",
      weekdays: ["SO", "MO", "DI", "MI", "DO", "FR", "SA"],
      lines: ["Ahorn fällt, Teedampf steigt", "Der Bergpfad führt tief in Wolken", "Regen im Bambus", "Eine Glocke im leeren Hof", "Lichter am Gasthaus erwachen", "Wind hinter dem Vorhang", "Mond über tausend Ziegeln"],
      credits: ["Ahornhof · Nach dem Regen", "Bergpass · Morgennebel", "Bambushain · Regen", "Alter Tempel · Glockenschatten", "Wasserherberge · Dämmerung", "Bühne · Vor dem Auftritt", "Dächer · Nachtreise"],
      modernLines: ["Regen bleibt auf dem leeren Bahnsteig", "Hinter der weißen Wand schweigt das Meer", "Nebel rückt die Maschinen in die Ferne", "Zwischen schwarzen Felsen antwortet der Wind nicht", "Die Gestalt im Glas geht auf die andere Seite", "Die Straße biegt vor dem Horizont ab", "Im Raum bleiben zwei leere Stühle"],
      modernCredits: ["Gelber Bahnhof · Nieselregen", "Weiße Küste · Nachmittag", "Industriehafen · Morgennebel", "Schwarzfelsinsel · Bedeckt", "Glasgang · Spiegelungen", "Ödlandstraße · Fernes Meer", "Leere Wohnung · Tageslicht"],
      strings: {
        appName: "Tagesszene", localOffline: "Lokal gespeichert · Offline", oneDayOneScene: "Ein Tag · Eine Szene", language: "Sprache", theme: "Stil", classicalTheme: "Klassisch", modernTheme: "Modern", modernClockLabel: "ORTSZEIT", today: "Heute",
        dateCaption: "HEUTIGE SZENE", titleLabel: "TITEL DES TAGES", titlePlaceholder: "Gib dem Tag einen Titel…", voiceoverPlaceholder: "Schreibe eine Zeile aus dem Off…",
        storyboard: "HEUTIGE EINSTELLUNGEN", tasks: "Aufgaben", time: "Zeit", newTask: "Schreibe etwas auf, das du erledigen willst…", add: "Hinzufügen",
        saved: "Gespeichert", saving: "Speichern", unsaved: "Nicht gespeichert", dataLocation: "Datenordner", backup: "Sicherung", backupDone: "Sicherung fertig",
        emptyTitle: "Noch keine Einstellung", emptyHint: "Beginne mit einer kleinen Sache und lass den Tag entstehen.", genericError: "Nicht gespeichert. Bitte erneut versuchen.",
        weekNav: "Diese Woche", previousDay: "Vorheriger Tag", nextDay: "Nächster Tag", clockLabel: "DOPPELSTUNDE", scene: "SZENE",
        complete: "Erledigen", reopen: "Als offen markieren", remove: "Löschen", taskNote: " Notiz", taskItem: "Aufgabe", hourWord: "Stunde", firstQuarter: "Anfangsviertel", quarterWord: "Viertel"
      }
    },
    "pt-BR": {
      label: "Português", lang: "pt-BR", dir: "ltr",
      weekdays: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
      lines: ["Cai o bordo, sobe o chá", "A trilha entra nas nuvens", "Chuva entre bambus", "Um sino no pátio vazio", "Luzes na pousada d'água", "Vento atrás da cortina", "Lua sobre mil telhas"],
      credits: ["Jardim de bordos · Pós-chuva", "Passo da montanha · Névoa", "Bambuzal · Chuva", "Templo antigo · Sino", "Pousada d'água · Crepúsculo", "Palco · Antes da entrada", "Telhados · Viagem noturna"],
      modernLines: ["A chuva fica na plataforma vazia", "Além do muro branco, o mar se cala", "A névoa afasta as máquinas", "Entre rochas negras, o vento não responde", "A figura no vidro passa para o outro lado", "A estrada curva antes do horizonte", "O cômodo guarda duas cadeiras vazias"],
      modernCredits: ["Estação amarela · Garoa", "Costa branca · Tarde", "Porto industrial · Névoa", "Ilha de rocha negra · Nublado", "Corredor de vidro · Reflexos", "Estrada deserta · Mar distante", "Apartamento vazio · Luz do dia"],
      strings: {
        appName: "Cena diária", localOffline: "Salvo localmente · Offline", oneDayOneScene: "Um dia · Uma cena", language: "Idioma", theme: "Tema", classicalTheme: "Clássico", modernTheme: "Moderno", modernClockLabel: "HORA LOCAL", today: "Hoje",
        dateCaption: "CENA DE HOJE", titleLabel: "TÍTULO DE HOJE", titlePlaceholder: "Dê um título ao dia…", voiceoverPlaceholder: "Escreva uma linha de narração…",
        storyboard: "PLANOS DE HOJE", tasks: "Tarefas", time: "Hora", newTask: "Escreva algo que deseja concluir…", add: "Adicionar",
        saved: "Salvo", saving: "Salvando", unsaved: "Não salvo", dataLocation: "Local dos dados", backup: "Backup", backupDone: "Backup concluído",
        emptyTitle: "Ainda não há planos", emptyHint: "Comece por algo pequeno e deixe o dia se revelar.", genericError: "Não foi possível salvar. Tente novamente.",
        weekNav: "Datas da semana", previousDay: "Dia anterior", nextDay: "Próximo dia", clockLabel: "HORA DUPLA", scene: "CENA",
        complete: "Concluir", reopen: "Marcar pendente", remove: "Excluir", taskNote: " nota", taskItem: "tarefa", hourWord: "hora", firstQuarter: "quarto inicial", quarterWord: "quarto"
      }
    },
    ru: {
      label: "Русский", lang: "ru", dir: "ltr",
      weekdays: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
      lines: ["Клён опал, чайный дым лёгок", "Тропа уходит в облака", "Дождь проходит сквозь бамбук", "Колокол в пустом дворе", "Огни у воды зажглись", "Ветер за занавесом", "Луна над тысячей крыш"],
      credits: ["Кленовый сад · После дождя", "Горный перевал · Туман", "Бамбуковая роща · Дождь", "Старый храм · Тень колокола", "Постоялый двор · Сумерки", "Сцена · Перед выходом", "Крыши · Ночной путь"],
      modernLines: ["Дождь остаётся на пустой платформе", "За белой стеной море молчит", "Туман отдаляет машины", "Среди чёрных скал ветер не отвечает", "Фигура в стекле уходит на другую сторону", "Дорога поворачивает перед горизонтом", "В комнате остаются два пустых стула"],
      modernCredits: ["Жёлтая станция · Мелкий дождь", "Белый берег · Полдень", "Промышленный порт · Утренний туман", "Остров чёрных скал · Пасмурно", "Стеклянный коридор · Отражения", "Пустынная дорога · Дальнее море", "Пустая квартира · Дневной свет"],
      strings: {
        appName: "Сцена дня", localOffline: "Сохранено локально · Офлайн", oneDayOneScene: "Один день · Одна сцена", language: "Язык", theme: "Стиль", classicalTheme: "Классика", modernTheme: "Модерн", modernClockLabel: "МЕСТНОЕ ВРЕМЯ", today: "Сегодня",
        dateCaption: "СЦЕНА ДНЯ", titleLabel: "НАЗВАНИЕ ДНЯ", titlePlaceholder: "Дайте этому дню название…", voiceoverPlaceholder: "Напишите одну строку за кадром…",
        storyboard: "КАДРЫ ДНЯ", tasks: "Дела", time: "Время", newTask: "Запишите, что хотите завершить…", add: "Добавить",
        saved: "Сохранено", saving: "Сохранение", unsaved: "Не сохранено", dataLocation: "Папка данных", backup: "Резервная копия", backupDone: "Копия создана",
        emptyTitle: "В этой сцене пока нет кадров", emptyHint: "Начните с малого — и день постепенно проявится.", genericError: "Не удалось сохранить. Попробуйте ещё раз.",
        weekNav: "Даты недели", previousDay: "Предыдущий день", nextDay: "Следующий день", clockLabel: "ДВОЙНОЙ ЧАС", scene: "СЦЕНА",
        complete: "Завершить", reopen: "Вернуть", remove: "Удалить", taskNote: " заметка", taskItem: "задача", hourWord: "час", firstQuarter: "начальная четверть", quarterWord: "четверть"
      }
    },
    ar: {
      label: "العربية", lang: "ar", dir: "rtl",
      weekdays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      lines: ["يسقط القيقب ويصعد بخار الشاي", "درب الجبل يدخل الغيوم", "مطر بين الخيزران", "جرس في فناء خالٍ", "مصابيح النزل عند الماء", "ريح خلف الستار", "قمر فوق ألف قرميدة"],
      credits: ["حديقة القيقب · بعد المطر", "الممر الجبلي · ضباب الفجر", "غابة الخيزران · المطر", "المعبد القديم · ظل الجرس", "نزل الماء · الغسق", "المسرح · قبل الدخول", "الأسطح · رحلة ليلية"],
      modernLines: ["يبقى المطر على الرصيف الخالي", "خلف الجدار الأبيض يلتزم البحر الصمت", "الضباب يبعد الآلات", "بين الصخور السوداء لا تجيب الريح", "يمضي الطيف في الزجاج إلى الجهة الأخرى", "ينعطف الطريق قبل الأفق", "تحتفظ الغرفة بكرسيين فارغين"],
      modernCredits: ["المحطة الصفراء · مطر خفيف", "الساحل الأبيض · بعد الظهر", "المرفأ الصناعي · ضباب الصباح", "جزيرة الصخور السوداء · غائم", "الممر الزجاجي · انعكاسات", "طريق البرية · بحر بعيد", "شقة خالية · ضوء النهار"],
      strings: {
        appName: "مشهد اليوم", localOffline: "محفوظ محليًا · بلا اتصال", oneDayOneScene: "يوم واحد · مشهد واحد", language: "اللغة", theme: "النمط", classicalTheme: "كلاسيكي", modernTheme: "حديث", modernClockLabel: "الوقت المحلي", today: "اليوم",
        dateCaption: "مشهد اليوم", titleLabel: "عنوان اليوم", titlePlaceholder: "امنح اليوم عنوانًا…", voiceoverPlaceholder: "اكتب سطرًا من التعليق…",
        storyboard: "لقطات اليوم", tasks: "المهام", time: "الوقت", newTask: "اكتب شيئًا تريد إنجازه…", add: "إضافة",
        saved: "تم الحفظ", saving: "جارٍ الحفظ", unsaved: "غير محفوظ", dataLocation: "موقع البيانات", backup: "نسخة احتياطية", backupDone: "اكتملت النسخة",
        emptyTitle: "لا لقطات في هذا المشهد بعد", emptyHint: "ابدأ بشيء صغير ودع اليوم يظهر ببطء.", genericError: "لم يتم الحفظ. حاول مرة أخرى.",
        weekNav: "تواريخ هذا الأسبوع", previousDay: "اليوم السابق", nextDay: "اليوم التالي", clockLabel: "الساعة المزدوجة", scene: "المشهد",
        complete: "إنجاز", reopen: "إعادة فتح", remove: "حذف", taskNote: " ملاحظة", taskItem: "مهمة", hourWord: "ساعة", firstQuarter: "الربع الأول", quarterWord: "ربع"
      }
    },
    hi: {
      label: "हिन्दी", lang: "hi", dir: "ltr",
      weekdays: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
      lines: ["मेपल झरे, चाय की भाप उठे", "पहाड़ी राह बादलों में", "बाँसों के बीच वर्षा", "सूने आँगन में घंटी", "जल-सराय में दीप जले", "परदे के पीछे हवा", "हज़ार छतों पर चाँद"],
      credits: ["मेपल आँगन · वर्षा के बाद", "पहाड़ी दर्रा · भोर की धुंध", "बाँस वन · वर्षा", "प्राचीन मंदिर · घंटी की छाया", "जल-सराय · संध्या", "मंच · प्रवेश से पहले", "छतें · रात्रि यात्रा"],
      modernLines: ["बारिश खाली प्लेटफ़ॉर्म पर ठहरती है", "सफेद दीवार के पार समुद्र मौन है", "कोहरा मशीनों को दूर कर देता है", "काली चट्टानों के बीच हवा उत्तर नहीं देती", "काँच की आकृति दूसरी ओर चली जाती है", "क्षितिज से पहले सड़क मुड़ती है", "कमरे में दो खाली कुर्सियाँ रह जाती हैं"],
      modernCredits: ["पीला स्टेशन · हल्की बारिश", "सफेद तट · दोपहर", "औद्योगिक बंदरगाह · सुबह का कोहरा", "काली चट्टान का द्वीप · बादल", "काँच गलियारा · प्रतिबिंब", "वीरान सड़क · दूर समुद्र", "खाली अपार्टमेंट · दिन का प्रकाश"],
      strings: {
        appName: "आज का दृश्य", localOffline: "स्थानीय रूप से सहेजा · ऑफ़लाइन", oneDayOneScene: "एक दिन · एक दृश्य", language: "भाषा", theme: "शैली", classicalTheme: "शास्त्रीय", modernTheme: "आधुनिक", modernClockLabel: "स्थानीय समय", today: "आज",
        dateCaption: "आज का दृश्य", titleLabel: "आज का शीर्षक", titlePlaceholder: "आज को एक शीर्षक दें…", voiceoverPlaceholder: "एक पंक्ति की आवाज़ लिखें…",
        storyboard: "आज के शॉट", tasks: "करने के काम", time: "समय", newTask: "जो पूरा करना है, उसे लिखें…", add: "जोड़ें",
        saved: "सहेजा गया", saving: "सहेज रहे हैं", unsaved: "सहेजा नहीं", dataLocation: "डेटा स्थान", backup: "बैकअप", backupDone: "बैकअप पूरा",
        emptyTitle: "इस दृश्य में अभी कोई शॉट नहीं", emptyHint: "एक छोटे काम से शुरू करें और दिन को उभरने दें।", genericError: "सहेजा नहीं जा सका। फिर कोशिश करें।",
        weekNav: "इस सप्ताह की तारीखें", previousDay: "पिछला दिन", nextDay: "अगला दिन", clockLabel: "दोहरी घड़ी", scene: "दृश्य",
        complete: "पूरा", reopen: "फिर खोलें", remove: "हटाएँ", taskNote: " टिप्पणी", taskItem: "काम", hourWord: "घंटा", firstQuarter: "पहला पहर", quarterWord: "चौथाई"
      }
    }
  };

  return {
    defaultLocale: "zh-CN",
    localeOrder: ["zh-CN", "zh-TW", "en", "ja", "ko", "es", "fr", "de", "pt-BR", "ru", "ar", "hi"],
    requiredKeys: ["appName", "localOffline", "oneDayOneScene", "language", "theme", "classicalTheme", "modernTheme", "modernClockLabel", "today", "dateCaption", "titleLabel", "titlePlaceholder", "voiceoverPlaceholder", "storyboard", "tasks", "time", "newTask", "add", "saved", "saving", "unsaved", "dataLocation", "backup", "backupDone", "emptyTitle", "emptyHint", "genericError", "weekNav", "previousDay", "nextDay", "clockLabel", "scene", "complete", "reopen", "remove", "taskNote", "taskItem", "hourWord", "firstQuarter", "quarterWord"],
    locales,
  };
});
