import json
from flask import Flask
from flask import abort
from flask import jsonify


app = Flask(__name__)

packages = {'openssl': 'v3.0.3',
            'zlib': 'v1.21.2',
            'boost': 'v1.79.0',
            'opengl': 'system'}

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

def cors_response(response):
    response = jsonify(response)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/licenses')
def licenses():
    return cors_response({'1':'license_1',
                          '2':'license_2',
                          '3':'license_3',
                          '4':'license_4',
                          '5':'license_5',
                          '6':'license_6'})

@app.route('/filters')
def filters():
    return cors_response({'1':'filter_1',
                          '2':'filter_2',
                          '3':'filter_3',
                          '4':'filter_4',
                          '5':'filter_5',
                          '6':'filter_6'})
@app.route('/popular')
def popular():
    return cors_response({'0':{'name':'openSSL','version':'v3.0.3'},
                          '1':{'name':'zlib','version':'v1.21.2'},
                          '2':{'name':'boost','version':'v1.79.0'},
                          '3':{'name':'OpenGL','version':'system'}})
@app.route('/updated')
def updated():
    return cors_response({'0':{'name':'openSSL','version':'v3.0.3'},
                          '1':{'name':'zlib','version':'v1.21.2'}})
@app.route('/new')
def new():
    return cors_response({'1':{'name':'boost','version':'v1.79.0'},
                          '2':{'name':'OpenGL','version':'system'}})

@app.route('/search/<query>')
def seacrh(query=''):
    result = {
        str(i): {
            'name': k, 'version': packages.get(k)
            }
        for i, k in enumerate([name for name in packages.keys() if query in name])
    }
    if query == 'all':
        result = {
            str(i): {'name': k, 'version': packages.get(k)}
            for i, k in enumerate([name for name in packages.keys()])
        }
    return cors_response(result)

@app.route('/package/<name>')
def package(name=''):
    if name in packages.keys():
        return cors_response({'name':name,'version':packages.get(name)})
    else:
        return abort(404)

@app.route('/package/<name>/md')
def md(name=''):
    if name in packages.keys():
        return cors_response({'md': md_use_it})
    else:
        return abort(404)

@app.route('/package/<name>/example')
def example(name=''):
    if name in packages.keys():
        return cors_response({'md': md_example})
    else:
        return abort(404)

@app.route('/package/<name>/shields_io')
def shields_io(name=''):
    if name in packages.keys():
        return cors_response({'md': shields_io_md.format(package=name)})
    else:
        return abort(404)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
