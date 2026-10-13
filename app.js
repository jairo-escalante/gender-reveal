(() => {
  'use strict';
  const labels = {
    es: {
      topline: 'UNA PEQUEÑA GRAN NOTICIA / A LITTLE BIG ANNOUNCEMENT', changeLanguage: 'Cambiar idioma', stepMarker: '01 / TU PREDICCIÓN',
      formEyebrow: 'NUESTRA FAMILIA CRECE', formTitle: 'Una dulce<br><em>sorpresa.</em>',
      formIntro: 'Antes de compartir nuestra gran noticia, queremos saber qué piensas. ¡Tu respuesta y tu mensaje serán un recuerdo muy especial!',
      scriptureReference: 'Salmo 127:3–5 · LBLA',
      scriptureVerse3: 'He aquí, don del Señor son los hijos; y recompensa es el fruto del vientre.',
      scriptureVerse4: 'Como flechas en la mano del guerrero, así son los hijos tenidos en la juventud.',
      scriptureVerse5: 'Bienaventurado el hombre que de ellos tiene llena su aljaba; no será avergonzado cuando hable con sus enemigos en la puerta.',
      nameLabel: '¿Cómo te llamas?', namePlaceholder: 'Escribe tu nombre', guessLabel: '¿Qué crees que será?',
      nameGuessLabel: '¿Cómo crees que se va a llamar?', nameGuessPlaceholder: 'Escribe el nombre que imaginas',
      boy: 'Niño', girl: 'Niña', messageLabel: 'Un mensaje para nuestro bebé', optional: '(opcional)',
      messagePlaceholder: 'Tus buenos deseos, una oración o unas palabras de amor...',
      messageHint: 'Lo guardaremos como un recuerdo.', dateLabel: '¿Qué día crees que nacerá?',
      dueHint: 'Fecha estimada de parto: 16 de marzo de 2027', submit: 'Guardar y descubrir la sorpresa',
      privacyNote: 'Tu respuesta y tu mensaje podrán verse en el enlace de mensajes de la familia. No necesitas crear ninguna cuenta.',
      saving: 'Guardando tu mensaje...', failed: 'No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.',
      setup: 'Esta página todavía no está conectada a Supabase. El organizador debe completar config.js.',
      missingFields: 'Completa tu nombre, selecciona niño o niña y elige una fecha.',
      revealEyebrow: 'NUESTRA DULCE BENDICIÓN', itsABoy: '¡Es un niño!', welcomeLine: 'Démosle la bienvenida a',
      revealMessage: 'Un nuevo regalo de Dios, una nueva historia de amor y un hermanito a quien abrazar.',
      ultrasoundCaption: 'Nuestro pequeño Alexander', brotherCaption: 'Jere, el mejor hermano mayor',
      ultrasoundAlt: 'Ecografía de Alexander', brotherAlt: 'Jere vestido de Buzz Lightyear, sosteniendo la ecografía de su hermanito Alexander',
      closing: 'Dos hermanos, una vida de aventuras. Gracias por acompañarnos en esta alegría.',
      signature: 'Con amor, la familia Escalante', thanks: '♡ Gracias por dejarnos un mensaje ♡'
    },
    en: {
      topline: 'UNA PEQUEÑA GRAN NOTICIA / A LITTLE BIG ANNOUNCEMENT', changeLanguage: 'Change language', stepMarker: '01 / YOUR PREDICTION',
      formEyebrow: 'OUR FAMILY IS GROWING', formTitle: 'A sweet little<br><em>surprise.</em>',
      formIntro: 'Before we share our wonderful news, we would love to know your prediction. Your answer and message will become a treasured family memory!',
      scriptureReference: 'Psalm 127:3–5',
      scriptureVerse3: 'Behold, children are a gift from the Lord, and the fruit of the womb is a reward.',
      scriptureVerse4: 'Like arrows in the hand of a warrior, so are the children born in youth.',
      scriptureVerse5: 'Blessed is the man whose quiver is full of them; he will not be put to shame when he speaks with his enemies at the gate.',
      nameLabel: 'What is your name?', namePlaceholder: 'Enter your name', guessLabel: 'What do you think it will be?',
      nameGuessLabel: 'What do you think the baby’s name will be?', nameGuessPlaceholder: 'Enter your name prediction',
      boy: 'Boy', girl: 'Girl', messageLabel: 'A message for our baby', optional: '(optional)',
      messagePlaceholder: 'Your wishes, a prayer, or a few words of love...',
      messageHint: 'We will keep it as a special memory.', dateLabel: 'When do you think our baby will arrive?',
      dueHint: 'Estimated due date: March 16, 2027', submit: 'Save my prediction & reveal the surprise',
      privacyNote: 'Your response and message can be viewed through the family’s message link. No account is needed.',
      saving: 'Saving your message...', failed: 'We could not save your answer. Please check your connection and try again.',
      setup: 'This page is not connected to Supabase yet. The organizer needs to complete config.js.',
      missingFields: 'Please enter your name, select boy or girl, and choose a date.',
      revealEyebrow: 'OUR SWEET BLESSING', itsABoy: "It's a boy!", welcomeLine: 'Please welcome',
      revealMessage: 'A new gift from God, a new story of love, and a little brother to hold close.',
      ultrasoundCaption: 'Our little Alexander', brotherCaption: 'Jere, the best big brother',
      ultrasoundAlt: 'Ultrasound of Alexander', brotherAlt: 'Jere dressed as Buzz Lightyear, holding the ultrasound of his little brother Alexander',
      closing: 'Two brothers, a lifetime of adventures. Thank you for sharing this joy with us.',
      signature: 'With love, the Escalante family', thanks: '♡ Thank you for leaving us a message ♡'
    }
  };
  const config = window.REVEAL_CONFIG || {};
  let language = 'es';
  let submitting = false;
  const submissionStorageKey = 'escalante-reveal:alexander-2027:submitted';
  let submittedLanguage = readSubmittedLanguage();
  const $ = selector => document.querySelector(selector);
  const form = $('#prediction-form');
  const feedback = $('#form-feedback');
  const submitButton = $('#submit-button');
  const screens = ['language-screen', 'form-screen', 'reveal-screen'];

  function readSubmittedLanguage() {
    try {
      const saved = window.localStorage.getItem(submissionStorageKey);
      return saved === 'es' || saved === 'en' ? saved : null;
    } catch {
      return null; // The form still works when browser storage is unavailable.
    }
  }
  function hasSubmitted() {
    submittedLanguage = readSubmittedLanguage() || submittedLanguage;
    return submittedLanguage !== null;
  }
  function rememberSubmission() {
    submittedLanguage = language;
    try {
      window.localStorage.setItem(submissionStorageKey, language);
    } catch {
      // Keep the successful reveal available for this visit even if storage is blocked.
    }
  }

  function setScreen(id) {
    document.body.classList.toggle('landing-visible', id === 'language-screen');
    for (const screenId of screens) {
      const section = document.getElementById(screenId);
      section.hidden = screenId !== id;
      section.classList.toggle('active', screenId === id);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'es';
    document.documentElement.lang = language;
    document.title = language === 'es' ? 'Una dulce sorpresa · Familia Escalante' : 'A sweet surprise · Escalante family';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'formTitle') el.innerHTML = labels[language][key]; // Local, fixed content only.
      else el.textContent = labels[language][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = labels[language][el.getAttribute('data-i18n-placeholder')];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      el.alt = labels[language][el.getAttribute('data-i18n-alt')];
    });
    feedback.textContent = '';
  }

  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.language);
      const returningGuest = hasSubmitted();
      setScreen(returningGuest ? 'reveal-screen' : 'form-screen');
      if (!returningGuest) $('#guest-name').focus({ preventScroll: true });
    });
  });
  $('#change-language').addEventListener('click', () => setScreen('language-screen'));
  $('#baby-message').addEventListener('input', event => {
    $('#message-count').textContent = `${event.target.value.length} / 600`;
  });
  const ultrasound = $('#ultrasound-photo');
  const brother = $('#brother-photo');
  if (config.ULTRASOUND_IMAGE) ultrasound.src = config.ULTRASOUND_IMAGE;
  if (config.BROTHER_IMAGE) brother.src = config.BROTHER_IMAGE;

  function isConfigured() {
    return typeof config.SUPABASE_URL === 'string'
      && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.SUPABASE_URL)
      && !config.SUPABASE_URL.includes('YOUR-PROJECT')
      && typeof config.SUPABASE_PUBLISHABLE_KEY === 'string'
      && (config.SUPABASE_PUBLISHABLE_KEY.startsWith('sb_publishable_') || config.SUPABASE_PUBLISHABLE_KEY.startsWith('eyJ'))
      && !config.SUPABASE_PUBLISHABLE_KEY.includes('REPLACE_ME');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    if (hasSubmitted()) {
      setScreen('reveal-screen');
      return;
    }
    feedback.textContent = '';
    feedback.className = 'feedback';
    const name = $('#guest-name').value.trim();
    const gender = document.querySelector('input[name="prediction"]:checked')?.value;
    const nameGuess = $('#baby-name-guess').value.trim();
    const message = $('#baby-message').value.trim();
    const birthGuess = $('#birth-guess').value;
    if (!name || !gender || !birthGuess || !form.checkValidity()) {
      feedback.textContent = labels[language].missingFields;
      form.reportValidity();
      return;
    }
    if ($('#website').value) return; // Honeypot: ignore obvious bots.
    if (!isConfigured() || !window.supabase?.createClient) {
      feedback.textContent = labels[language].setup;
      return;
    }

    submitting = true;
    submitButton.disabled = true;
    submitButton.querySelector('[data-i18n]').textContent = labels[language].saving;
    try {
      const client = window.supabase.createClient(config.SUPABASE_URL.replace(/\/$/, ''), config.SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });
      // Save only; the separate message viewer reads responses.
      const { error } = await client.from('predictions').insert({
        name, prediction: gender, name_guess: nameGuess, message, birth_guess: birthGuess, language
      });
      if (error) throw error;
      rememberSubmission();
      form.reset();
      $('#message-count').textContent = '0 / 600';
      setScreen('reveal-screen');
    } catch (error) {
      console.error('Submission failed:', error);
      feedback.textContent = labels[language].failed;
      feedback.className = 'feedback error';
    } finally {
      submitting = false;
      submitButton.disabled = false;
      submitButton.querySelector('[data-i18n]').textContent = labels[language].submit;
    }
  });
  setLanguage(submittedLanguage || 'es');
  setScreen(hasSubmitted() ? 'reveal-screen' : 'language-screen');
})();
