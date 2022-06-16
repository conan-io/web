from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


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


packages = {
    'openssl': {
        'version': 'v3.0.3',
        'licenses': ['license_1', 'license_2', 'license_3'],
        'labels': ['filter_1', 'filter_2', 'filter_3'],
        'downloads': 146,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.'
    },
    'zlib': {
        'version': 'v1.21.2',
        'licenses': ['license_1', 'license_3', 'license_4'],
        'labels': ['filter_1', 'filter_3', 'filter_4'],
        'downloads': 1064,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.'
    },
    'boost': {
        'version': 'v1.79.0',
        'licenses': ['license_1', 'license_4', 'license_5'],
        'labels': ['filter_1', 'filter_4', 'filter_5'],
        'downloads': 100854,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.'
    },
    'opengl': {
        'version': 'system',
        'licenses': ['license_1', 'license_5', 'license_6'],
        'labels': ['filter_1', 'filter_5', 'filter_6'],
        'downloads': 14,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.'
    }
}

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

@app.get('/licenses')
async def licenses():
    return {'1':'license_1',
            '2':'license_2',
            '3':'license_3',
            '4':'license_4',
            '5':'license_5',
            '6':'license_6'}

@app.get('/filters')
async def filters():
    return {'1':'filter_1',
            '2':'filter_2',
            '3':'filter_3',
            '4':'filter_4',
            '5':'filter_5',
            '6':'filter_6'}

@app.get('/popular')
async def popular():
    return {'0':{'name':'openSSL','version':'v3.0.3'},
            '1':{'name':'zlib','version':'v1.21.2'},
            '2':{'name':'boost','version':'v1.79.0'},
            '3':{'name':'OpenGL','version':'system'}}

@app.get('/updated')
async def updated():
    return {'0':{'name':'openSSL','version':'v3.0.3'},
            '1':{'name':'zlib','version':'v1.21.2'}}

@app.get('/new')
async def new():
    return {'1':{'name':'boost','version':'v1.79.0'},
            '2':{'name':'OpenGL','version':'system'}}

@app.get('/search/{query}')
async def seacrh(query='', filters=''):
    filters = filters.split(',')
    result = {}

    for name in packages.keys():
        element = {'name': name, 'info': packages.get(name)}
        if (query != 'all') and not(query in name):
            element = None
        if filters and filters!=[''] and not all(item in (packages.get(name).get('labels') + packages.get(name).get('licenses')) for item in filters):
            element = None
        if element:
            result[str(len(result))] = element

    return result

@app.get('/package/{name}')
async def package(name=''):
    if name in packages.keys():
        return {'name':name, 'info': packages.get(name)}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/md')
async def md(name=''):
    if name in packages.keys():
        return {'md': md_use_it}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/example')
async def example(name=''):
    if name in packages.keys():
        return {'md': md_example}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/shields_io')
async def shields_io(name=''):
    if name in packages.keys():
        return {'md': shields_io_md.format(package=name)}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

@app.get("/")
async def root():
    return {}
