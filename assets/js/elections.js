// Elections page functionality

document.addEventListener('DOMContentLoaded', function () {
    // Wait for AOS to initialize
    setTimeout(function () {
        // Initialize expandable sections
        initExpandableSections();

        // Initialize candidate selector
        initCandidateSelector();

        // Initialize category selector
        initCategorySelector();

        // Reinitialize AOS for new content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 100);
});

// Expandable sections functionality
function initExpandableSections() {
    document.querySelectorAll('.expandable-header').forEach(header => {
        header.addEventListener('click', function () {
            const section = this.closest('.expandable-section');
            section.classList.toggle('expanded');
        });
    });
}

// Smooth scroll for nav cards
document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        const targetSection = document.querySelector(target);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// Candidate selector functionality
function initCandidateSelector() {
    const candidateItems = document.querySelectorAll('.list-item[data-candidate-id]');
    const profileContainer = document.getElementById('candidateProfile');

    if (!candidateItems.length || !profileContainer) return;

    // Set first candidate as active by default
    if (candidateItems.length > 0) {
        candidateItems[0].classList.add('active');
        displayCandidateProfile(candidateItems[0].dataset.candidateId);
    }

    // Add click handlers
    candidateItems.forEach(item => {
        item.addEventListener('click', function () {
            candidateItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            displayCandidateProfile(this.dataset.candidateId);
        });
    });
}

// Display candidate profile
function displayCandidateProfile(candidateId) {
    const profileData = getCandidateData(candidateId);
    const profileContainer = document.getElementById('candidateProfile');

    if (!profileContainer || !profileData) return;

    profileContainer.style.opacity = '0';

    setTimeout(() => {
        profileContainer.innerHTML = `
      <div class="candidate-profile-content">
        <div class="profile-header">
          <div class="profile-avatar">
            ${profileData.icon || '<i class="ri-user-fill"></i>'}
          </div>
          <div class="profile-basic">
            <h3>${profileData.name}</h3>
            <p class="position">${profileData.position}</p>
            <p class="major">${profileData.major}</p>
          </div>
        </div>

        <div class="profile-details">
          <h4>Program és célok</h4>
          <p>${profileData.program}</p>

          <h4>Tapasztalat</h4>
          <p>${profileData.experience}</p>

          <h4>Főbb célkitűzések</h4>
          <ul class="goals-list">
            ${profileData.goals.map(goal => `<li>${goal}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
        profileContainer.style.opacity = '1';
    }, 150);
}

// Get candidate data
function getCandidateData(candidateId) {
    const isHungarian = document.documentElement.lang === 'hu' || window.location.pathname.includes('valasztas.html');

    const candidates = {
        'gergo-meszner': {
            hu: {
                name: 'Mészner Gergely',
                position: 'Elnöki jelölt',
                major: 'Gazdálkodás és menedzsment szak',
                program: 'Gergely célja a HÖK szervezetének modernizálása és a hallgatói érdekképviselet erősítése. Úgy véli, hogy a transzparencia és az include gondolkodásmód elengedhetetlen a szervezet sikereséhez.',
                experience: 'Több éve aktív tag a HÖK-ben, korábban az Oktatási Terület vezetője volt. Számos hallgatói projekt szervezésében vett részt és kialakult rálátása van a szervezet működésére.',
                goals: [
                    'HÖK transzparens és nyitott működésének erősítése',
                    'Hallgatói érdekek hatékonyabb képviselete az egyetemen',
                    'Új digitális megoldások bevezetése a szervezetben',
                    'Belsőséges közösségépítés fokozása'
                ]
            },
            en: {
                name: 'Gergely Mészner',
                position: 'Presidential Candidate',
                major: 'Business Administration',
                program: 'Gergely aims to modernize the HÖK organization and strengthen student representation. He believes transparency and inclusive thinking are essential for organizational success.',
                experience: 'He has been an active member of the HÖK for several years and previously led the Educational Department. He has participated in numerous student projects and has a solid understanding of organizational operations.',
                goals: [
                    'Strengthening transparent and open HÖK operations',
                    'More effective representation of student interests at the university',
                    'Introducing new digital solutions in the organization',
                    'Enhancing internal community building'
                ]
            }
        },
        'barnabas-banyai': {
            hu: {
                name: 'Bányai Barnabás',
                position: 'Alelnöki jelölt',
                major: 'Nemzetközi tanulmányok szak',
                program: 'Barnabás a nemzetközi hallgatók integrációjára és a HÖK nemzetközi kapcsolatainak fejlesztésére koncentrál. Azt szeretné, hogy a szervezet még inkább nyitott legyen a nemzetközi hallgatók irányában.',
                experience: 'A Nemzetközi Terület korábbi munkatársa, számos nemzetközi hallgatói programot szerzett. Az International Students Club tevékeny közreműködője és a Pannonia Ösztöndíjprogram egyik szervezője.',
                goals: [
                    'Nemzetközi hallgatók integrációjának javítása',
                    'HÖK nemzetközi partneri hálózatának bővítése',
                    'Hallgatócseréprogram lehetőségeinek növelése',
                    'Multikulturális campus építése'
                ]
            },
            en: {
                name: 'Barnabás Bányai',
                position: 'Vice-Presidential Candidate',
                major: 'International Studies',
                program: 'Barnabás focuses on integrating international students and developing HÖK\'s international partnerships. He wants the organization to be even more open to international students.',
                experience: 'Former member of the International Department, has organized numerous international student programs. Active contributor to the International Students Club and organizer of the Pannonia Scholarship Program.',
                goals: [
                    'Improving integration of international students',
                    'Expanding HÖK\'s international partner network',
                    'Increasing student exchange program opportunities',
                    'Building a multicultural campus'
                ]
            }
        },
        'dora-haraszti': {
            hu: {
                name: 'Haraszti Dóra',
                position: 'Alelnöki jelölt',
                major: 'Közgazdaságtan szak',
                program: 'Dóra a HÖK gazdasági fenntarthatóságára és a hallgatói szociális támogatás fejlesztésére fókuszál. Célja, hogy a szervezet még jobban tudjon segíteni a rászoruló hallgatókon.',
                experience: 'A Gazdasági Terület aktív munkatársa, összetett pénzügyi projektek kezelésében van tapasztalata. A Hallgatói Szociális Bizottság korábbi tagja, ahol a pályázati eljárások finomhangolásában vett részt.',
                goals: [
                    'HÖK költségvetésének optimalizálása',
                    'Szociális támogatási programok bővítése',
                    'Hallgatói ösztöndíjak hozzáférésének javítása',
                    'Gazdasági transzparencia erősítése'
                ]
            },
            en: {
                name: 'Dóra Haraszti',
                position: 'Vice-Presidential Candidate',
                major: 'Economics',
                program: 'Dóra focuses on HÖK\'s financial sustainability and developing student social support. She aims to help disadvantaged students more effectively.',
                experience: 'Active member of the Economic Department with experience in complex financial projects. Former member of the Student Social Committee, where she participated in refining scholarship procedures.',
                goals: [
                    'Optimizing HÖK\'s budget',
                    'Expanding social support programs',
                    'Improving access to student scholarships',
                    'Strengthening financial transparency'
                ]
            }
        },
        'laszlo-nagy': {
            hu: {
                name: 'Nagy László',
                position: 'Alelnöki jelölt',
                major: 'Controlling szak',
                program: 'László a HÖK belső szerkezetének racionalizálása és az adminisztratív folyamatok digitalizálása felé irányul. A hatékonyság és az értékesítés szerinte kulcsfontosságú kritériumok.',
                experience: 'Az Oktatási Terület munkatársa, ahol a szervezeti folyamatok dokumentációja és fejlesztése a feladata. Informatikai fejlesztésekben és rendszerfejlesztésben is tapasztalattal rendelkezik.',
                goals: [
                    'Adminisztratív folyamatok automatizálása',
                    'Digitális eszközökhöz való hozzáférés bővítése',
                    'Szervezeti hatékonyság javítása',
                    'Hallgatói feedback rendszerének kiépítése'
                ]
            },
            en: {
                name: 'László Nagy',
                position: 'Vice-Presidential Candidate',
                major: 'Controlling',
                program: 'László focuses on rationalizing HÖK\'s internal structure and digitalizing administrative processes. He believes efficiency and effectiveness are key criteria.',
                experience: 'Member of the Educational Department, responsible for organizational process documentation and development. Also has experience in IT development and system engineering.',
                goals: [
                    'Automating administrative processes',
                    'Expanding access to digital tools',
                    'Improving organizational efficiency',
                    'Establishing a student feedback system'
                ]
            }
        },
        'eva-szabo': {
            hu: {
                name: 'Szabó Éva',
                position: 'Küldöttgyűlési jelölt',
                major: 'Marketing szak',
                program: 'Éva a HÖK kommunikációjának és márkaépítésének fejlesztésére fókuszál. Azt szeretné, hogy a szervezet még több fiatal éljen meg a hallgatók körében.',
                experience: 'A Kommunikációs Terület tagja, ahol kreatív kampányok és social media tartalmak készítésében aktív. Számos rendezvény pr-munkájában közreműködött és szponzori kapcsolatok kiépítésében vett részt.',
                goals: [
                    'HÖK márkaidentitásának erősítése',
                    'Social media jelenlét fejlesztése',
                    'Hallgatói community building aktivitások',
                    'Rendezvénykommunikáció fejlesztése'
                ]
            },
            en: {
                name: 'Éva Szabó',
                position: 'Delegation Candidate',
                major: 'Marketing',
                program: 'Éva focuses on developing HÖK\'s communication and brand building. She wants the organization to be more engaged with students.',
                experience: 'Member of the Communications Department, active in creating creative campaigns and social media content. Has contributed to PR work for numerous events and sponsorship relationship building.',
                goals: [
                    'Strengthening HÖK\'s brand identity',
                    'Developing social media presence',
                    'Student community building activities',
                    'Improving event communication'
                ]
            }
        },
        'peter-kovacs': {
            hu: {
                name: 'Kovács Péter',
                position: 'Küldöttgyűlési jelölt',
                major: 'Finanszírozás szak',
                program: 'Péter a HÖK pénzügyi rendszerének modernizálása és a finanszírozási lehetőségek bővítésére törekszik. Úgy gondolja, hogy az erős pénzügyi alapok a szervezet hosszú távú sikerének kulcsa.',
                experience: 'A Gazdasági Terület tapasztalt munkatársa, költségvetés-tervezés és pénzügyi auditálásban jártas. Banksektorbeli tapasztalattal is rendelkezik, amely segítségére van a pénzügyi stratégiai tervezésben.',
                goals: [
                    'HÖK finanszírozási források diverzifikálása',
                    'Hallgatói támogatási program kiterjesztése',
                    'Költségvetési tervezés professzionalizálása',
                    'Szponzori és partner-kapcsolatok fejlesztése'
                ]
            },
            en: {
                name: 'Péter Kovács',
                position: 'Delegation Candidate',
                major: 'Finance',
                program: 'Péter seeks to modernize HÖK\'s financial system and expand financing opportunities. He believes strong financial foundations are key to long-term organizational success.',
                experience: 'Experienced member of the Economic Department, skilled in budget planning and financial auditing. He also has banking sector experience, which helps with financial strategic planning.',
                goals: [
                    'Diversifying HÖK\'s financing sources',
                    'Expanding student support programs',
                    'Professionalizing budget planning',
                    'Developing sponsorship and partnership relationships'
                ]
            }
        }
    };

    const candidateData = candidates[candidateId];
    if (!candidateData) return null;

    const lang = isHungarian && candidateData.hu ? 'hu' : 'en';
    const data = candidateData[lang];

    return {
        ...data,
        icon: '<i class="ri-user-fill"></i>'
    };
}

// Category selector functionality
function initCategorySelector() {
    const categoryItems = document.querySelectorAll('.list-item[data-category-id]');
    const categoryContainer = document.getElementById('categoryProfile');

    if (!categoryItems.length || !categoryContainer) return;

    // Set first category as active by default
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
        displayCategoryDetails(categoryItems[0].dataset.categoryId);
    }

    // Add click handlers
    categoryItems.forEach(item => {
        item.addEventListener('click', function () {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            displayCategoryDetails(this.dataset.categoryId);
        });
    });
}

// Display category details
function displayCategoryDetails(categoryId) {
    const categoryData = getCategoryData(categoryId);
    const container = document.getElementById('categoryProfile');

    if (!container || !categoryData) return;

    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
      <div class="details-content">
        <h3>${categoryData.title}</h3>
        <p>${categoryData.description}</p>

        <h4>Candidates in this category:</h4>
        <ul class="tasks-list">
          ${categoryData.candidates.map(candidate => `<li>${candidate}</li>`).join('')}
        </ul>

        <h4>Responsibilities</h4>
        <ul class="tasks-list">
          ${categoryData.tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
      </div>
    `;
        container.style.opacity = '1';
    }, 150);
}

// Get category data
function getCategoryData(categoryId) {
    const isHungarian = document.documentElement.lang === 'hu' || window.location.pathname.includes('valasztas.html');

    const categories = {
        'elnokseg': {
            title: isHungarian ? 'Elnökség' : 'Presidency',
            description: isHungarian
                ? 'Az Elnökség a HÖK legfőbb döntéshozó testülete. Az elnök és az alelnökök felelősek a szervezet általános irányításáért és stratégiai ügyeiért.'
                : 'The Presidency is the main decision-making body of the HÖK. The president and vice-presidents are responsible for general management and strategic affairs.',
            candidates: isHungarian
                ? ['Mészner Gergely (elnöki jelölt)', 'Bányai Barnabás (alelnöki jelölt)', 'Haraszti Dóra (alelnöki jelölt)', 'Nagy László (alelnöki jelölt)']
                : ['Gergely Mészner (presidential candidate)', 'Barnabás Bányai (vice-presidential candidate)', 'Dóra Haraszti (vice-presidential candidate)', 'László Nagy (vice-presidential candidate)'],
            tasks: isHungarian
                ? ['Szervezeti stratégia kidolgozása és végrehajtása', 'Hallgatói érdekek képviselete az egyetembizottságokon', 'Szervezeti egységek közötti koordináció', 'Nyilvánosságra hozatal és kommunikáció', 'Szervezeti döntések meghozatala és végrehajtása']
                : ['Development and implementation of organizational strategy', 'Representation of student interests in university committees', 'Coordination between organizational units', 'Public relations and communication', 'Making and executing organizational decisions']
        },
        'kueldottgyueles': {
            title: isHungarian ? 'Küldöttgyűlés' : 'Delegation',
            description: isHungarian
                ? 'A Küldöttgyűlés a szervezet testületi értekezlete, ahol a delegáltak a terültek képviseletét látják el és a főbb döntésekhez hozzájárulnak.'
                : 'The Delegation is the organizational assembly where delegates represent their areas and contribute to major decisions.',
            candidates: isHungarian
                ? ['Szabó Éva (küldöttgyűlési jelölt)', 'Kovács Péter (küldöttgyűlési jelölt)']
                : ['Éva Szabó (delegation candidate)', 'Péter Kovács (delegation candidate)'],
            tasks: isHungarian
                ? ['Területi képviselet a szervezeten belül', 'Testületi döntésekhez való hozzájárulás', 'Hallgatói feedback gyűjtése és továbbítása', 'Szervezeti programok támogatása', 'Szervezeti fejlesztési javaslatok beadása']
                : ['Area representation within the organization', 'Contributing to assembly decisions', 'Collecting and forwarding student feedback', 'Supporting organizational programs', 'Submitting organizational development proposals']
        }
    };

    return categories[categoryId] || null;
}
