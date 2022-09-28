from fastapi import FastAPI


ENABLE_CORS = False


app = FastAPI()


if ENABLE_CORS:
    origins = ["*"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)


@app.get('/licenses')
async def get_licenses():
    return {
        '1': 'license_1',
        '2': 'license_2',
        '3': 'license_3',
        '4': 'license_4',
        '5': 'license_5',
        '6': 'license_6',
    }


@app.get('/filters')
async def get_filters():
    return {
        '1': 'topic_1',
        '2': 'topic_2',
        '3': 'topic_3',
        '4': 'topic_4',
        '5': 'topic_5',
        '6': 'topic_6',
    }


@app.get('/popular')
async def get_popular():
    return {
        '0': {'name': 'boost', 'version': 'v1.79.0'},
        '1': {'name': 'zlib', 'version': 'v1.21.2'},
        '2': {'name': 'openssl', 'version': 'v3.0.3'},
        '3': {'name': 'opengl', 'version': 'system'}
    }


@app.get('/updated')
async def get_updated():
    return {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


@app.get('/new')
async def get_new():
    return {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


@app.get('/search/{query}')
async def get_search(query='', filters='', licenses=''):
    return {
        '0': {
            'info': {
                'description': 'Lorem ipsum dolor sit amet, consectetur '
                               'adipiscing elit. Etiam nibh est, suscipit vel '
                               'convallis eget, euismod a leo. Vivamus '
                               'sagittis mi non dui iaculis tincidunt. Aliquam '
                               'metus risus, maximus sed tristique sed, '
                               'vehicula at neque. Nam nunc metus, vestibulum '
                               'id iaculis in, sodales et arcu. Nulla lorem '
                               'enim, hendrerit sit.',
                'downloads': 14,
                'labels': ['topic_1', 'topic_5', 'topic_6'],
                'licenses': ['license_1', 'license_5', 'license_6'],
                'version': 'system'
            },
            'name': 'opengl'
        },
    }


@app.get('/package/{name}')
async def get_package(name=''):
    return {
       "3.0.5":{
          "name":"openssl",
          "info":{
             "version":"3.0.5",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "3.0.4":{
          "name":"openssl",
          "info":{
             "version":"3.0.4",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "3.0.3":{
          "name":"openssl",
          "info":{
             "version":"3.0.3",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1q":{
          "name":"openssl",
          "info":{
             "version":"1.1.1q",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1p":{
          "name":"openssl",
          "info":{
             "version":"1.1.1p",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1o":{
          "name":"openssl",
          "info":{
             "version":"1.1.1o",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.0l":{
          "name":"openssl",
          "info":{
             "version":"1.1.0l",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.0.2u":{
          "name":"openssl",
          "info":{
             "version":"1.0.2u",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       }
    }



@app.get('/package/{name}/md')
async def get_md(name=''):
    return {'md': md_use_it}


@app.get('/package/{name}/example')
async def get_example(name=''):
    return {'md': md_example}


@app.get('/package/{name}/shields_io')
async def get_shields_io(name=''):
    return {'md': shields_io_md}



@app.get('/package/{name}/options')
async def get_options(name=''):
    return {'md': options_md}


@app.get('/package/{name}/packages')
async def get_packages(name=''):
    return {'md': packages_md}


@app.get('/package/{name}/downloads')
async def get_downloads(name=''):
    return {
        'downloads': [
            {'date': '2022-06-26', 'downloads': 7},
            {'date': '2022-06-27', 'downloads': 46},
            {'date': '2022-06-28', 'downloads': 35},
            {'date': '2022-06-29', 'downloads': 14}
        ],
    }


@app.get('/reference/num')
async def get_reference_num(query='', filters='', licenses=''):
    return {'references': 1}


@app.get("/status")
async def get_root():
    return {"status": "ok"}


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

![Conan Center](https://img.shields.io/conan/v/opengl)

**Copy Markdown** `![Conan Center](https://img.shields.io/conan/v/opengl)`

**Copy reStructuredText** `.. image:: https://img.shields.io/conan/v/opengl   :alt: Conan Center`

**Copy AsciiDoc** `image:https://img.shields.io/conan/v/opengl[Conan Center]`

**copy HTML** `<img alt="Conan Center" src="https://img.shields.io/conan/v/opengl">`
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
