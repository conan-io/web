import traceback
from db import SessionLocal
from db import manager


def licenses():
    try:
        session = SessionLocal()
        result = manager.get_licenses(session)
        return {str(i): license for i, license in enumerate(result)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def filters():
    try:
        session = SessionLocal()
        result = manager.get_topics(session)
        return {str(i): topic for i, topic in enumerate(result)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def popular():
    try:
        session = SessionLocal()
        result = manager.get_popular_conan_references(session, limit=10)
        return {str(i): {'name': reference.name, 'version': reference.version} for i, reference in enumerate(result)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def updated():
    try:
        session = SessionLocal()
        result = manager.get_last_updated_conan_references(session, limit=10)
        return {str(i): {'name': reference.name, 'version': reference.version} for i, reference in enumerate(result)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def new():
    try:
        session = SessionLocal()
        result = manager.get_last_created_conan_references(session, limit=10)
        return {str(i): {'name': reference.name, 'version': reference.version} for i, reference in enumerate(result)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def search(query=None, filters=''):
    try:
        session = SessionLocal()
        filters = filters.split(',')

        query = None if query=='all' else query
        filters = None if filters==[''] else filters

        result = manager.get_conan_references_filtered(session, query, filters, filters)

        return {
            str(i): {
                'name': reference.name,
                'info':{
                    'version': reference.version,
                    'licenses': manager.get_licenses(session, ids=[l.license_id for l in reference.licenses]),
                    'labels': manager.get_topics(session, ids=[t.topic_id for t in reference.topics]),
                    'downloads': reference.downloadcounts[0].count,
                    'description': reference.reciperevisions[0].description,
                }
            } for i, reference in enumerate(result)
        }
    except:
        traceback.print_exc()
    finally:
        session.close()


def package(name=''):
    try:
        session = SessionLocal()
        result = manager.get_conan_reference_by_name(session, name)

        return {
            'name': result.name,
            'info':{
                'version': result.version,
                'licenses': manager.get_licenses(session, ids=[l.license_id for l in result.licenses]),
                'labels': manager.get_topics(session, ids=[t.topic_id for t in result.topics]),
                'downloads': result.downloadcounts[0].count,
                'description': result.reciperevisions[0].description,
                }
        }
    except:
        traceback.print_exc()
    finally:
        session.close()


def md(name=''):
    try:
        session = SessionLocal()
        if manager.get_conan_reference_by_name(session, name):
            return {'md': md_use_it}
    except:
        traceback.print_exc()
    finally:
        session.close()


def example(name=''):
    try:
        session = SessionLocal()
        if manager.get_conan_reference_by_name(session, name):
            return {'md': md_example}
    except:
        traceback.print_exc()
    finally:
        session.close()


def shields_io(name=''):
    try:
        session = SessionLocal()
        if manager.get_conan_reference_by_name(session, name):
            return {'md': shields_io_md.format(package=name)}
    except:
        traceback.print_exc()
    finally:
        session.close()


def options(name=''):
    try:
        session = SessionLocal()
        if manager.get_conan_reference_by_name(session, name):
            return {'md': options_md}
    except:
        traceback.print_exc()
    finally:
        session.close()


def packages(name=''):
    try:
        session = SessionLocal()
        if manager.get_conan_reference_by_name(session, name):
            return {'md': packages_md}
    except:
        traceback.print_exc()
    finally:
        session.close()


def downloads(name=''):
    try:
        session = SessionLocal()
        result = manager.get_conan_reference_by_name(session, name)
        if result:
            return {
                'downloads': [{'date': d.date, 'downloads': d.count} for d in reversed(result.downloadcounts)]
            }
    except:
        traceback.print_exc()
    finally:
        session.close()


def reference_num(query=None, filters=''):
    try:
        session = SessionLocal()
        filters = filters.split(',')

        query = None if query=='all' else query
        filters = None if filters==[''] else filters
        result = len(manager.get_conan_references_filtered(session, query, filters, filters))

        return {'references': result}
    except:
        traceback.print_exc()
    finally:
        session.close()


options_md = '''
# Options

{
'generators': ['cmake', 'cmake_find_package_multi'],
'settings': ['os', 'arch', 'compiler', 'build_type'],
'options': {
        'shared': [True, False],
        'fPIC': [True, False],
        'cmd': [True, False],
        'wav': [True, False],
        'flac': [True, False],
        'mpg123': [True, False],
        'mad': [True, False],
        'ogg': [True, False],
        'opus': [True, False],
        'mikmod': [True, False],
        'modplug': [True, False],
        'fluidsynth': [True, False],
        'nativemidi': [True, False],
        'tinymidi': [True, False]
    },
    'default_options': {
        'shared': False,
        'fPIC': True,
        'cmd': False,
        'wav': True,
        'flac': True,
        'mpg123': True,
        'mad': True,
        'ogg': True,
        'opus': True,
        'mikmod': True,
        'modplug': True,
        'fluidsynth': False,
        'nativemidi': True,
        'tinymidi': True
    },
}
'''


packages_md = '''
# Packages

{
'windows': {
    'x86_64': ['Visual Studio', 'clang'],
},
'mac': {
    'x86_64': ['clang', 'apple-clang'],
    'x86': ['clang', 'apple-clang']
},
'linux': {
    'x86_64': ['gcc', 'clang',],
    'x86': ['gcc', 'clang',],
    'arm': ['gcc', 'clang',],
},
}
'''

shields_io_md = '''
# shields.io badges

![Conan Center](https://img.shields.io/conan/v/{package})

**Copy Markdown** `![Conan Center](https://img.shields.io/conan/v/{package})`

**Copy reStructuredText** `.. image:: https://img.shields.io/conan/v/{package}   :alt: Conan Center`

**Copy AsciiDoc** `image:https://img.shields.io/conan/v/{package}[Conan Center]`

**copy HTML** `<img alt="Conan Center" src="https://img.shields.io/conan/v/{package}">`
'''


md_example = '''
    #include <iostream>
    using namespace std;

    int main()
    {
        int n, range;

        cout << "Enter an integer: ";
        cin >> n;

        cout << "Enter range: ";
        cin >> range;

        for (int i = 1; i <= range; ++i) {
            cout << n << " * " << i << " = " << n * i << endl;
        }

        return 0;
    }
'''


md_use_it = '''
# Iam iuvit ulciscitur cava tempora non niveisque

## Ipse licet singultuque caput amplexaque vellera hos

Lorem markdownum vi pedibus Chersidamante laeva [dies
molis](http://cum-atque.net/), est, choreas, fide. Adludit erat ratione,
[enim](http://illud.net/thersitesaiaci): in auro tenui conanti annos, *cladi
Cyane spectacula* effugit Rhoetei summa. [Crepitantia
distincta](http://tribuam-potiar.com/agamneque.html) frondes siqua vicem cratem;
distincta pacalibus nomen. Equidem ad ardua terras divis celsior Si domino
recenti uva pars bubo coniecit corpore, perquirere et orba impia quaerere. Fuit
ore se incessit amici alium provolvi interdum relicta anguem istis?

- Cymeli loqui et amanti
- Celebres et nostra si
- Nunc sanguine
- Nescio iecit
- Antra abiit poenamque

## Curva reddebant

Inter utque tegat sensit. Eum pia stemus [in reverentia](http://fuit.io/)
specie! Gnato vertisse et saeva, aptas adspicit Sicula multi captato.

Inscribit tangi. Et *minax manibusque* vultus. Videtur secuta esset seu, illa
vox omnia ora lumina dolet lugebisque mihi recipit futuri exspectatum inertes.
Quaeris linguisque lupos est paene in quod, figit in gurgite volucresque
acumine, est tamen rupta agat. Nullam victoris colla, erat dixisse caeli
flumina, lacrimis et pedes.

- Ignesque fessa harenas presserat
- Lingua aliudve transit vestibus quibus
- Iove sequuntur moras orantem animoque medio
- Perque in socios acerque
- Caelum Amathunta vacuas captae

## Sed opis ignea

Modo Aiax mediis quin, sua latices, sed necemque siquid, nec constat naufragus
si! Sorores adest ora luserit sequatur **me aequor tantum** servatum hostibus
sucis; omnes increpuit sidera incensaque. Adspicias robora putes saxum
collectum; haec ardentis furto efficerentque vitam ergo
[penna](http://fugiant.io/a-maluit), est abit placidoque. A Telamon servat
recondita matri, flexi *una* fundere auctor, in?

    if (iosGopherNetbios < userMethodConfiguration) {
        view.memoryReaderEup -= open;
    } else {
        dpiRasterWebmaster.wamp_heuristic_t /= 2;
    }
    if (-1) {
        umlPpm = copyright + jre_dslam_column + flopsCaps;
        vgaMicrophone(syn, piconetSla);
    }
    cybercrimeTouchscreenHdv += hard(databaseServer.aluToslink(metaRpmCaptcha));
    if (menu == 4) {
        ttl = inbox * terabyte + edutainment.file(key_servlet);
        uriModeFtp *= only_page;
    } else {
        computer_virus_link.kilohertz = trackback_basic(4, 72);
        memoryRecycle(31, dac_text, graphic_edi.rup_ctp_art.booleanSector(
                openDimmPing));
    }
    if (1) {
        friend_extension_forum += 5;
        mode -= 445532;
        column -= caseFddiMail;
    } else {
        copy_dns_name(ssid_adc_bar(workstation_pcmcia));
        constantOcrWamp.digital = yottabyte(point + p_gamma_file);
    }

Epulas et frustra Ancaei validi spicula, vult **non** morari guttas
[lacrimans](http://plurimus-pro.net/arbor) mirabilis anguem quantum *mora
cumque*. Partibus Epidaurius de crimen cum comas animus idem *relatu* mihique
castris sui, curvavit petis cum antiquo. Matura Flentibus *quid finibus* sed,
cum est, laborant? Per Thesea nectare ille signaque conligit fata [Aeolon
quinque](http://votagestum.io/illa-novissima) Maeandri siderea rogata.
'''
