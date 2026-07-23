/**
 * i18n.js
 *
 * Internationalization setup and language switching logic. 
 * Enables dynamic language changes in the application.
 * 
 */




/* get laguage list from language.json  */
/* fetching  languages.josn */
function getAvailableLanguages() {
    return fetch('./i18n/languages.json')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch languages.json: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Support either { languages: [...] } or [...] formats
            if (Array.isArray(data.languages)) return data.languages;
            if (Array.isArray(data)) return data;
            console.warn('Unexpected languages.json format, expected array or { languages: [...] }', data);
            return [];
        })
        .catch(error => {
            console.error('Error fetching languages:', error);
            return [];
        });
}

export async function setupI18n(langSelectorId = 'langSelector', langOptionHTML = `<button data-lang="%code">%name</button>`) {
    let languages = await getAvailableLanguages();
    if (!languages || !languages.length) {
        // fallback minimal language list so downstream code won't break
        languages = [{ code: 'en', name: 'English' }];
    }

    // Normalize to language codes for includes checks (supports array of strings or objects)
    const languageCodes = languages.map(l => (typeof l === 'string' ? l : l.code)).filter(Boolean);

    const userLang = (navigator.language || navigator.userLanguage).toLowerCase().split('-')[0];
    let currentLangCode = 'en'; // default language

    // Check if user's language is available (compare against codes)
    if (languageCodes.includes(userLang)) {
        currentLangCode = userLang;
    } else {
        // fallback on first language in the list
        currentLangCode = languageCodes[0] || currentLangCode;
    }

    const selector = document.getElementById(langSelectorId);
    if (selector) {
        selector.innerHTML = languages.map(lang => {
            const code = (typeof lang === 'string' ? lang : lang.code);
            const name = (typeof lang === 'string' ? lang : (lang.name || lang.code));
            var optHTML = langOptionHTML.replaceAll('%code', code).replaceAll('%name', name);
            return optHTML;
        }).join('');
    } else {
        console.warn(`Language selector element with id "${langSelectorId}" not found.`);
    }

    // Function to load language file and update UI
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            const translations = await response.json();
            document.querySelectorAll('[data-t9n]').forEach(elem => {
                const key = elem.getAttribute('data-t9n');
                if (translations[key]) {
                    elem.textContent = translations[key];
                }
            });
            document.querySelectorAll('[data-t9n-t]').forEach(elem => {
                const key = elem.getAttribute('data-t9n-t');
                if (translations[key]) {
                    elem.title = translations[key];
                }
            });


        } catch (error) {
            console.error(`Error loading language file for ${lang}:`, error);
        }
    }

    // Initial load
    await loadLanguage(currentLangCode);

    // Language switcher logic
    if (selector) {
        if (selector && selector.tagName.toLowerCase() === 'select') {
            // set the selected option to true
            // Set the selector's value to current language
            selector.setAttribute('value', currentLangCode);

            selector.addEventListener('change', async (event) => {
                const selectedLang = event.target.value;
                if (languageCodes.includes(selectedLang)) {
                    await loadLanguage(selectedLang);
                }
            });
        }
        // else handleradio buttons
        else if (selector && selector.querySelectorAll('input[type="radio"]').length > 0) {
            // set the selected radio button to checked
            const radios = selector.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                if (radio.value === currentLangCode) {
                    radio.checked = true;
                }
            });

            selector.addEventListener('change', async (event) => {
                const target = event.target;
                if (target) {
                    const selectedLang = target.value;
                    if (languageCodes.includes(selectedLang)) {
                        await loadLanguage(selectedLang);
                    }
                }
            });
        }
        //  else generic container with buttons or divs
        else
            selector.addEventListener('click', async (event) => {
                const btn = event.target.closest('[data-lang]');
                if (btn) {
                    const selectedLang = btn.getAttribute('data-lang');
                    if (languageCodes.includes(selectedLang)) {
                        await loadLanguage(selectedLang);
                    }
                }
            });
    }

    return { languages, languageCodes };
}
