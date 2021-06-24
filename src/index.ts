interface IMimeType {
  charset: string;
  catalog: { [key: string]: any };
  lookup(
    fname: string,
    include_charset?: string | boolean,
    default_mime_type?: string
  ): string | boolean;
  set(exts: string, mime_type_string: string): boolean;
  del(ext: string): boolean;
  forEach(callback: any): any;
}

const path = {
  extname: function(filename: string) {
    if (filename.lastIndexOf('.') > 0) {
      return filename.substr(filename.lastIndexOf('.'));
    }
    return '';
  },
};

const mimetype: IMimeType = {
  charset: 'UTF-8',
  catalog: {},
  lookup: function(
    fname: string,
    include_charset?: string | boolean,
    default_mime_type?: string
  ) {
    let ext,
      charset = this.charset;

    if (include_charset === undefined) {
      include_charset = false;
    }

    if (typeof include_charset === 'string') {
      charset = include_charset;
      include_charset = true;
    }

    if (path.extname !== undefined) {
      ext = path.extname(fname).toLowerCase();
    } else if (fname.lastIndexOf('.') > 0) {
      ext = fname.substr(fname.lastIndexOf('.')).toLowerCase();
    } else {
      ext = fname;
    }

    // Handle the special cases where their is no extension
    // e..g README, manifest, LICENSE, TODO
    if (ext === '') {
      ext = fname;
    }

    if (this.catalog[ext] !== undefined) {
      if (
        include_charset === true &&
        this.catalog[ext].indexOf('text/') === 0 &&
        this.catalog[ext].indexOf('charset') < 0
      ) {
        return this.catalog[ext] + '; charset=' + charset;
      } else {
        return this.catalog[ext];
      }
    } else if (default_mime_type !== undefined) {
      if (
        include_charset === true &&
        default_mime_type.indexOf('text/') === 0
      ) {
        return default_mime_type + '; charset=' + charset;
      }
      return default_mime_type;
    }
    return false;
  },
  set: function(exts, mime_type_string) {
    let result = true,
      self = this;

    if (exts.indexOf(',') > -1) {
      exts.split(',').forEach(function(ext) {
        ext = ext.trim();
        self.catalog[ext] = mime_type_string;
        if (self.catalog[ext] !== mime_type_string) {
          result = false;
        }
      });
    } else {
      self.catalog[exts] = mime_type_string;
    }
    return result;
  },
  del: function(ext) {
    delete this.catalog[ext];
    return this.catalog[ext] === undefined;
  },
  forEach: function(callback) {
    let self = this,
      ext;

    for (ext in self.catalog) {
      if (self.catalog.hasOwnProperty(ext)) {
        callback(ext, self.catalog[ext]);
      }
    }
    return self.catalog;
  },
};

// From Apache project's mime type list.
mimetype.set('.ez', 'application/andrew-inset');
mimetype.set('.aw', 'application/applixware');
mimetype.set('.atom', 'application/atom+xml');
mimetype.set('.atomcat', 'application/atomcat+xml');
mimetype.set('.atomsvc', 'application/atomsvc+xml');
mimetype.set('.ccxml', 'application/ccxml+xml');
mimetype.set('.cu', 'application/cu-seeme');
mimetype.set('.davmount', 'application/davmount+xml');
mimetype.set('.ecma', 'application/ecmascript');
mimetype.set('.emma', 'application/emma+xml');
mimetype.set('.epub', 'application/epub+zip');
mimetype.set('.pfr', 'application/font-tdpfr');
mimetype.set('.stk', 'application/hyperstudio');
mimetype.set('.jar', 'application/java-archive');
mimetype.set('.ser', 'application/java-serialized-object');
mimetype.set('.class', 'application/java-vm');
mimetype.set('.js', 'application/javascript');
mimetype.set('.json', 'application/json');
mimetype.set('.lostxml', 'application/lost+xml');
mimetype.set('.hqx', 'application/mac-binhex40');
mimetype.set('.cpt', 'application/mac-compactpro');
mimetype.set('.mrc', 'application/marc');
mimetype.set('.ma,.nb,.mb', 'application/mathematica');
mimetype.set('.mathml', 'application/mathml+xml');
mimetype.set('.mbox', 'application/mbox');
mimetype.set('.mscml', 'application/mediaservercontrol+xml');
mimetype.set('.mp4s', 'application/mp4');
mimetype.set('.doc,.dot', 'application/msword');
mimetype.set('.mxf', 'application/mxf');
mimetype.set('.oda', 'application/oda');
mimetype.set('.opf', 'application/oebps-package+xml');
mimetype.set('.ogx', 'application/ogg');
mimetype.set('.onetoc,.onetoc2,.onetmp,.onepkg', 'application/onenote');
mimetype.set('.xer', 'application/patch-ops-error+xml');
mimetype.set('.pdf', 'application/pdf');
mimetype.set('.pgp', 'application/pgp-encrypted');
mimetype.set('.asc,.sig', 'application/pgp-signature');
mimetype.set('.prf', 'application/pics-rules');
mimetype.set('.p10', 'application/pkcs10');
mimetype.set('.p7m,.p7c', 'application/pkcs7-mime');
mimetype.set('.p7s', 'application/pkcs7-signature');
mimetype.set('.cer', 'application/pkix-cert');
mimetype.set('.crl', 'application/pkix-crl');
mimetype.set('.pkipath', 'application/pkix-pkipath');
mimetype.set('.pki', 'application/pkixcmp');
mimetype.set('.pls', 'application/pls+xml');
mimetype.set('.ai,.eps,.ps', 'application/postscript');
mimetype.set('.cww', 'application/prs.cww');
mimetype.set('.rdf', 'application/rdf+xml');
mimetype.set('.rif', 'application/reginfo+xml');
mimetype.set('.rnc', 'application/relax-ng-compact-syntax');
mimetype.set('.rl', 'application/resource-lists+xml');
mimetype.set('.rld', 'application/resource-lists-diff+xml');
mimetype.set('.rs', 'application/rls-services+xml');
mimetype.set('.rsd', 'application/rsd+xml');
mimetype.set('.rss', 'application/rss+xml');
mimetype.set('.rtf', 'application/rtf');
mimetype.set('.sbml', 'application/sbml+xml');
mimetype.set('.scq', 'application/scvp-cv-request');
mimetype.set('.scs', 'application/scvp-cv-response');
mimetype.set('.spq', 'application/scvp-vp-request');
mimetype.set('.spp', 'application/scvp-vp-response');
mimetype.set('.sdp', 'application/sdp');
mimetype.set('.setpay', 'application/set-payment-initiation');
mimetype.set('.setreg', 'application/set-registration-initiation');
mimetype.set('.shf', 'application/shf+xml');
mimetype.set('.smi,.smil', 'application/smil+xml');
mimetype.set('.rq', 'application/sparql-query');
mimetype.set('.srx', 'application/sparql-results+xml');
mimetype.set('.gram', 'application/srgs');
mimetype.set('.grxml', 'application/srgs+xml');
mimetype.set('.ssml', 'application/ssml+xml');
mimetype.set('.plb', 'application/vnd.3gpp.pic-bw-large');
mimetype.set('.psb', 'application/vnd.3gpp.pic-bw-small');
mimetype.set('.pvb', 'application/vnd.3gpp.pic-bw-var');
mimetype.set('.tcap', 'application/vnd.3gpp2.tcap');
mimetype.set('.pwn', 'application/vnd.3m.post-it-notes');
mimetype.set('.aso', 'application/vnd.accpac.simply.aso');
mimetype.set('.imp', 'application/vnd.accpac.simply.imp');
mimetype.set('.acu', 'application/vnd.acucobol');
mimetype.set('.atc,.acutc', 'application/vnd.acucorp');
mimetype.set(
  '.air',
  'application/vnd.adobe.air-application-installer-package+zip'
);
mimetype.set('.xdp', 'application/vnd.adobe.xdp+xml');
mimetype.set('.xfdf', 'application/vnd.adobe.xfdf');
mimetype.set('.azf', 'application/vnd.airzip.filesecure.azf');
mimetype.set('.azs', 'application/vnd.airzip.filesecure.azs');
mimetype.set('.azw', 'application/vnd.amazon.ebook');
mimetype.set('.acc', 'application/vnd.americandynamics.acc');
mimetype.set('.ami', 'application/vnd.amiga.ami');
mimetype.set('.apk', 'application/vnd.android.package-archive');
mimetype.set('.cii', 'application/vnd.anser-web-certificate-issue-initiation');
mimetype.set('.fti', 'application/vnd.anser-web-funds-transfer-initiation');
mimetype.set('.atx', 'application/vnd.antix.game-component');
mimetype.set('.mpkg', 'application/vnd.apple.installer+xml');
mimetype.set('.swi', 'application/vnd.arastra.swi');
mimetype.set('.aep', 'application/vnd.audiograph');
mimetype.set('.mpm', 'application/vnd.blueice.multipass');
mimetype.set('.bmi', 'application/vnd.bmi');
mimetype.set('.rep', 'application/vnd.businessobjects');
mimetype.set('.cdxml', 'application/vnd.chemdraw+xml');
mimetype.set('.mmd', 'application/vnd.chipnuts.karaoke-mmd');
mimetype.set('.cdy', 'application/vnd.cinderella');
mimetype.set('.cla', 'application/vnd.claymore');
mimetype.set('.c4g,.c4d,.c4f,.c4p,.c4u', 'application/vnd.clonk.c4group');
mimetype.set('.csp', 'application/vnd.commonspace');
mimetype.set('.cdbcmsg', 'application/vnd.contact.cmsg');
mimetype.set('.cmc', 'application/vnd.cosmocaller');
mimetype.set('.clkx', 'application/vnd.crick.clicker');
mimetype.set('.clkk', 'application/vnd.crick.clicker.keyboard');
mimetype.set('.clkp', 'application/vnd.crick.clicker.palette');
mimetype.set('.clkt', 'application/vnd.crick.clicker.template');
mimetype.set('.clkw', 'application/vnd.crick.clicker.wordbank');
mimetype.set('.wbs', 'application/vnd.criticaltools.wbs+xml');
mimetype.set('.pml', 'application/vnd.ctc-posml');
mimetype.set('.ppd', 'application/vnd.cups-ppd');
mimetype.set('.car', 'application/vnd.curl.car');
mimetype.set('.pcurl', 'application/vnd.curl.pcurl');
mimetype.set('.rdz', 'application/vnd.data-vision.rdz');
mimetype.set('.fe_launch', 'application/vnd.denovo.fcselayout-link');
mimetype.set('.dna', 'application/vnd.dna');
mimetype.set('.mlp', 'application/vnd.dolby.mlp');
mimetype.set('.dpg', 'application/vnd.dpgraph');
mimetype.set('.dfac', 'application/vnd.dreamfactory');
mimetype.set('.geo', 'application/vnd.dynageo');
mimetype.set('.mag', 'application/vnd.ecowin.chart');
mimetype.set('.nml', 'application/vnd.enliven');
mimetype.set('.esf', 'application/vnd.epson.esf');
mimetype.set('.msf', 'application/vnd.epson.msf');
mimetype.set('.qam', 'application/vnd.epson.quickanime');
mimetype.set('.slt', 'application/vnd.epson.salt');
mimetype.set('.ssf', 'application/vnd.epson.ssf');
mimetype.set('.es3,.et3', 'application/vnd.eszigno3+xml');
mimetype.set('.ez2', 'application/vnd.ezpix-album');
mimetype.set('.ez3', 'application/vnd.ezpix-package');
mimetype.set('.fdf', 'application/vnd.fdf');
mimetype.set('.mseed', 'application/vnd.fdsn.mseed');
mimetype.set('.seed,.dataless', 'application/vnd.fdsn.seed');
mimetype.set('.gph', 'application/vnd.flographit');
mimetype.set('.ftc', 'application/vnd.fluxtime.clip');
mimetype.set('.fm,.frame,.maker,.book', 'application/vnd.framemaker');
mimetype.set('.fnc', 'application/vnd.frogans.fnc');
mimetype.set('.ltf', 'application/vnd.frogans.ltf');
mimetype.set('.fsc', 'application/vnd.fsc.weblaunch');
mimetype.set('.oas', 'application/vnd.fujitsu.oasys');
mimetype.set('.oa2', 'application/vnd.fujitsu.oasys2');
mimetype.set('.oa3', 'application/vnd.fujitsu.oasys3');
mimetype.set('.fg5', 'application/vnd.fujitsu.oasysgp');
mimetype.set('.bh2', 'application/vnd.fujitsu.oasysprs');
mimetype.set('.ddd', 'application/vnd.fujixerox.ddd');
mimetype.set('.xdw', 'application/vnd.fujixerox.docuworks');
mimetype.set('.xbd', 'application/vnd.fujixerox.docuworks.binder');
mimetype.set('.fzs', 'application/vnd.fuzzysheet');
mimetype.set('.txd', 'application/vnd.genomatix.tuxedo');
mimetype.set('.ggb', 'application/vnd.geogebra.file');
mimetype.set('.ggt', 'application/vnd.geogebra.tool');
mimetype.set('.gex,.gre', 'application/vnd.geometry-explorer');
mimetype.set('.gmx', 'application/vnd.gmx');
mimetype.set('.kml', 'application/vnd.google-earth.kml+xml');
mimetype.set('.kmz', 'application/vnd.google-earth.kmz');
mimetype.set('.gqf,.gqs', 'application/vnd.grafeq');
mimetype.set('.gac', 'application/vnd.groove-account');
mimetype.set('.ghf', 'application/vnd.groove-help');
mimetype.set('.gim', 'application/vnd.groove-identity-message');
mimetype.set('.grv', 'application/vnd.groove-injector');
mimetype.set('.gtm', 'application/vnd.groove-tool-message');
mimetype.set('.tpl', 'application/vnd.groove-tool-template');
mimetype.set('.vcg', 'application/vnd.groove-vcard');
mimetype.set('.zmm', 'application/vnd.handheld-entertainment+xml');
mimetype.set('.hbci', 'application/vnd.hbci');
mimetype.set('.les', 'application/vnd.hhe.lesson-player');
mimetype.set('.hpgl', 'application/vnd.hp-hpgl');
mimetype.set('.hpid', 'application/vnd.hp-hpid');
mimetype.set('.hps', 'application/vnd.hp-hps');
mimetype.set('.jlt', 'application/vnd.hp-jlyt');
mimetype.set('.pcl', 'application/vnd.hp-pcl');
mimetype.set('.pclxl', 'application/vnd.hp-pclxl');
mimetype.set('.sfd-hdstx', 'application/vnd.hydrostatix.sof-data');
mimetype.set('.x3d', 'application/vnd.hzn-3d-crossword');
mimetype.set('.mpy', 'application/vnd.ibm.minipay');
mimetype.set('.afp,.listafp,.list3820', 'application/vnd.ibm.modcap');
mimetype.set('.irm', 'application/vnd.ibm.rights-management');
mimetype.set('.sc', 'application/vnd.ibm.secure-container');
mimetype.set('.icc,.icm', 'application/vnd.iccprofile');
mimetype.set('.igl', 'application/vnd.igloader');
mimetype.set('.ivp', 'application/vnd.immervision-ivp');
mimetype.set('.ivu', 'application/vnd.immervision-ivu');
mimetype.set('.xpw,.xpx', 'application/vnd.intercon.formnet');
mimetype.set('.qbo', 'application/vnd.intu.qbo');
mimetype.set('.qfx', 'application/vnd.intu.qfx');
mimetype.set('.rcprofile', 'application/vnd.ipunplugged.rcprofile');
mimetype.set('.irp', 'application/vnd.irepository.package+xml');
mimetype.set('.xpr', 'application/vnd.is-xpr');
mimetype.set('.jam', 'application/vnd.jam');
mimetype.set('.rms', 'application/vnd.jcp.javame.midlet-rms');
mimetype.set('.jisp', 'application/vnd.jisp');
mimetype.set('.joda', 'application/vnd.joost.joda-archive');
mimetype.set('.ktz,.ktr', 'application/vnd.kahootz');
mimetype.set('.karbon', 'application/vnd.kde.karbon');
mimetype.set('.chrt', 'application/vnd.kde.kchart');
mimetype.set('.kfo', 'application/vnd.kde.kformula');
mimetype.set('.flw', 'application/vnd.kde.kivio');
mimetype.set('.kon', 'application/vnd.kde.kontour');
mimetype.set('.kpr,.kpt', 'application/vnd.kde.kpresenter');
mimetype.set('.ksp', 'application/vnd.kde.kspread');
mimetype.set('.kwd,.kwt', 'application/vnd.kde.kword');
mimetype.set('.htke', 'application/vnd.kenameaapp');
mimetype.set('.kia', 'application/vnd.kidspiration');
mimetype.set('.kne,.knp', 'application/vnd.kinar');
mimetype.set('.skp,.skd,.skt,.skm', 'application/vnd.koan');
mimetype.set('.sse', 'application/vnd.kodak-descriptor');
mimetype.set('.lbd', 'application/vnd.llamagraphics.life-balance.desktop');
mimetype.set('.lbe', 'application/vnd.llamagraphics.life-balance.exchange+xml');
mimetype.set('.123', 'application/vnd.lotus-1-2-3');
mimetype.set('.apr', 'application/vnd.lotus-approach');
mimetype.set('.pre', 'application/vnd.lotus-freelance');
mimetype.set('.nsf', 'application/vnd.lotus-notes');
mimetype.set('.org', 'application/vnd.lotus-organizer');
mimetype.set('.scm', 'application/vnd.lotus-screencam');
mimetype.set('.lwp', 'application/vnd.lotus-wordpro');
mimetype.set('.portpkg', 'application/vnd.macports.portpkg');
mimetype.set('.mcd', 'application/vnd.mcd');
mimetype.set('.mc1', 'application/vnd.medcalcdata');
mimetype.set('.cdkey', 'application/vnd.mediastation.cdkey');
mimetype.set('.mwf', 'application/vnd.mfer');
mimetype.set('.mfm', 'application/vnd.mfmp');
mimetype.set('.flo', 'application/vnd.micrografx.flo');
mimetype.set('.igx', 'application/vnd.micrografx.igx');
mimetype.set('.mif', 'application/vnd.mif');
mimetype.set('.daf', 'application/vnd.mobius.daf');
mimetype.set('.dis', 'application/vnd.mobius.dis');
mimetype.set('.mbk', 'application/vnd.mobius.mbk');
mimetype.set('.mqy', 'application/vnd.mobius.mqy');
mimetype.set('.msl', 'application/vnd.mobius.msl');
mimetype.set('.plc', 'application/vnd.mobius.plc');
mimetype.set('.txf', 'application/vnd.mobius.txf');
mimetype.set('.mpn', 'application/vnd.mophun.application');
mimetype.set('.mpc', 'application/vnd.mophun.certificate');
mimetype.set('.xul', 'application/vnd.mozilla.xul+xml');
mimetype.set('.cil', 'application/vnd.ms-artgalry');
mimetype.set('.cab', 'application/vnd.ms-cab-compressed');
mimetype.set('.xls,.xlm,.xla,.xlc,.xlt,.xlw', 'application/vnd.ms-excel');
mimetype.set('.xlam', 'application/vnd.ms-excel.addin.macroenabled.12');
mimetype.set('.xlsb', 'application/vnd.ms-excel.sheet.binary.macroenabled.12');
mimetype.set('.xlsm', 'application/vnd.ms-excel.sheet.macroenabled.12');
mimetype.set('.xltm', 'application/vnd.ms-excel.template.macroenabled.12');
mimetype.set('.eot', 'application/vnd.ms-fontobject');
mimetype.set('.chm', 'application/vnd.ms-htmlhelp');
mimetype.set('.ims', 'application/vnd.ms-ims');
mimetype.set('.lrm', 'application/vnd.ms-lrm');
mimetype.set('.cat', 'application/vnd.ms-pki.seccat');
mimetype.set('.stl', 'application/vnd.ms-pki.stl');
mimetype.set('.ppt,.pps,.pot', 'application/vnd.ms-powerpoint');
mimetype.set('.ppam', 'application/vnd.ms-powerpoint.addin.macroenabled.12');
mimetype.set(
  '.pptm',
  'application/vnd.ms-powerpoint.presentation.macroenabled.12'
);
mimetype.set('.sldm', 'application/vnd.ms-powerpoint.slide.macroenabled.12');
mimetype.set(
  '.ppsm',
  'application/vnd.ms-powerpoint.slideshow.macroenabled.12'
);
mimetype.set('.potm', 'application/vnd.ms-powerpoint.template.macroenabled.12');
mimetype.set('.mpp,.mpt', 'application/vnd.ms-project');
mimetype.set('.docm', 'application/vnd.ms-word.document.macroenabled.12');
mimetype.set('.dotm', 'application/vnd.ms-word.template.macroenabled.12');
mimetype.set('.wps,.wks,.wcm,.wdb', 'application/vnd.ms-works');
mimetype.set('.wpl', 'application/vnd.ms-wpl');
mimetype.set('.xps', 'application/vnd.ms-xpsdocument');
mimetype.set('.mseq', 'application/vnd.mseq');
mimetype.set('.mus', 'application/vnd.musician');
mimetype.set('.msty', 'application/vnd.muvee.style');
mimetype.set('.nlu', 'application/vnd.neurolanguage.nlu');
mimetype.set('.nnd', 'application/vnd.noblenet-directory');
mimetype.set('.nns', 'application/vnd.noblenet-sealer');
mimetype.set('.nnw', 'application/vnd.noblenet-web');
mimetype.set('.ngdat', 'application/vnd.nokia.n-gage.data');
mimetype.set('.n-gage', 'application/vnd.nokia.n-gage.symbian.install');
mimetype.set('.rpst', 'application/vnd.nokia.radio-preset');
mimetype.set('.rpss', 'application/vnd.nokia.radio-presets');
mimetype.set('.edm', 'application/vnd.novadigm.edm');
mimetype.set('.edx', 'application/vnd.novadigm.edx');
mimetype.set('.ext', 'application/vnd.novadigm.ext');
mimetype.set('.odc', 'application/vnd.oasis.opendocument.chart');
mimetype.set('.otc', 'application/vnd.oasis.opendocument.chart-template');
mimetype.set('.odb', 'application/vnd.oasis.opendocument.database');
mimetype.set('.odf', 'application/vnd.oasis.opendocument.formula');
mimetype.set('.odft', 'application/vnd.oasis.opendocument.formula-template');
mimetype.set('.odg', 'application/vnd.oasis.opendocument.graphics');
mimetype.set('.otg', 'application/vnd.oasis.opendocument.graphics-template');
mimetype.set('.odi', 'application/vnd.oasis.opendocument.image');
mimetype.set('.oti', 'application/vnd.oasis.opendocument.image-template');
mimetype.set('.odp', 'application/vnd.oasis.opendocument.presentation');
mimetype.set('.ods', 'application/vnd.oasis.opendocument.spreadsheet');
mimetype.set('.ots', 'application/vnd.oasis.opendocument.spreadsheet-template');
mimetype.set('.odt', 'application/vnd.oasis.opendocument.text');
mimetype.set('.otm', 'application/vnd.oasis.opendocument.text-master');
mimetype.set('.ott', 'application/vnd.oasis.opendocument.text-template');
mimetype.set('.oth', 'application/vnd.oasis.opendocument.text-web');
mimetype.set('.xo', 'application/vnd.olpc-sugar');
mimetype.set('.dd2', 'application/vnd.oma.dd2+xml');
mimetype.set('.oxt', 'application/vnd.openofficeorg.extension');
mimetype.set(
  '.pptx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
);
mimetype.set(
  '.sldx',
  'application/vnd.openxmlformats-officedocument.presentationml.slide'
);
mimetype.set(
  '.ppsx',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
);
mimetype.set(
  '.potx',
  'application/vnd.openxmlformats-officedocument.presentationml.template'
);
mimetype.set(
  '.xlsx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
);
mimetype.set(
  '.xltx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
);
mimetype.set(
  '.docx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
);
mimetype.set(
  '.dotx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
);
mimetype.set('.dp', 'application/vnd.osgi.dp');
mimetype.set('.pdb,.pqa,.oprc', 'application/vnd.palm');
mimetype.set('.str', 'application/vnd.pg.format');
mimetype.set('.ei6', 'application/vnd.pg.osasli');
mimetype.set('.efif', 'application/vnd.picsel');
mimetype.set('.plf', 'application/vnd.pocketlearn');
mimetype.set('.pbd', 'application/vnd.powerbuilder6');
mimetype.set('.box', 'application/vnd.previewsystems.box');
mimetype.set('.mgz', 'application/vnd.proteus.magazine');
mimetype.set('.qps', 'application/vnd.publishare-delta-tree');
mimetype.set('.ptid', 'application/vnd.pvi.ptid1');
mimetype.set(
  '.qxd,.qxt,.qwd,.qwt,.qxl,.qxb',
  'application/vnd.quark.quarkxpress'
);
mimetype.set('.mxl', 'application/vnd.recordare.musicxml');
mimetype.set('.musicxml', 'application/vnd.recordare.musicxml+xml');
mimetype.set('.cod', 'application/vnd.rim.cod');
mimetype.set('.rm', 'application/vnd.rn-realmedia');
mimetype.set('.link66', 'application/vnd.route66.link66+xml');
mimetype.set('.see', 'application/vnd.seemail');
mimetype.set('.sema', 'application/vnd.sema');
mimetype.set('.semd', 'application/vnd.semd');
mimetype.set('.semf', 'application/vnd.semf');
mimetype.set('.ifm', 'application/vnd.shana.informed.formdata');
mimetype.set('.itp', 'application/vnd.shana.informed.formtemplate');
mimetype.set('.iif', 'application/vnd.shana.informed.interchange');
mimetype.set('.ipk', 'application/vnd.shana.informed.package');
mimetype.set('.twd,.twds', 'application/vnd.simtech-mindmapper');
mimetype.set('.mmf', 'application/vnd.smaf');
mimetype.set('.teacher', 'application/vnd.smart.teacher');
mimetype.set('.sdkm,.sdkd', 'application/vnd.solent.sdkm+xml');
mimetype.set('.dxp', 'application/vnd.spotfire.dxp');
mimetype.set('.sfs', 'application/vnd.spotfire.sfs');
mimetype.set('.sdc', 'application/vnd.stardivision.calc');
mimetype.set('.sda', 'application/vnd.stardivision.draw');
mimetype.set('.sdd', 'application/vnd.stardivision.impress');
mimetype.set('.smf', 'application/vnd.stardivision.math');
mimetype.set('.sdw', 'application/vnd.stardivision.writer');
mimetype.set('.vor', 'application/vnd.stardivision.writer');
mimetype.set('.sgl', 'application/vnd.stardivision.writer-global');
mimetype.set('.sxc', 'application/vnd.sun.xml.calc');
mimetype.set('.stc', 'application/vnd.sun.xml.calc.template');
mimetype.set('.sxd', 'application/vnd.sun.xml.draw');
mimetype.set('.std', 'application/vnd.sun.xml.draw.template');
mimetype.set('.sxi', 'application/vnd.sun.xml.impress');
mimetype.set('.sti', 'application/vnd.sun.xml.impress.template');
mimetype.set('.sxm', 'application/vnd.sun.xml.math');
mimetype.set('.sxw', 'application/vnd.sun.xml.writer');
mimetype.set('.sxg', 'application/vnd.sun.xml.writer.global');
mimetype.set('.stw', 'application/vnd.sun.xml.writer.template');
mimetype.set('.sus,.susp', 'application/vnd.sus-calendar');
mimetype.set('.svd', 'application/vnd.svd');
mimetype.set('.sis,.sisx', 'application/vnd.symbian.install');
mimetype.set('.xsm', 'application/vnd.syncml+xml');
mimetype.set('.bdm', 'application/vnd.syncml.dm+wbxml');
mimetype.set('.xdm', 'application/vnd.syncml.dm+xml');
mimetype.set('.tao', 'application/vnd.tao.intent-module-archive');
mimetype.set('.tmo', 'application/vnd.tmobile-livetv');
mimetype.set('.tpt', 'application/vnd.trid.tpt');
mimetype.set('.mxs', 'application/vnd.triscape.mxs');
mimetype.set('.tra', 'application/vnd.trueapp');
mimetype.set('.ufd,.ufdl', 'application/vnd.ufdl');
mimetype.set('.utz', 'application/vnd.uiq.theme');
mimetype.set('.umj', 'application/vnd.umajin');
mimetype.set('.unityweb', 'application/vnd.unity');
mimetype.set('.uoml', 'application/vnd.uoml+xml');
mimetype.set('.vcx', 'application/vnd.vcx');
mimetype.set('.vsd,.vst,.vss,.vsw', 'application/vnd.visio');
mimetype.set('.vis', 'application/vnd.visionary');
mimetype.set('.vsf', 'application/vnd.vsf');
mimetype.set('.wbxml', 'application/vnd.wap.wbxml');
mimetype.set('.wmlc', 'application/vnd.wap.wmlc');
mimetype.set('.wmlsc', 'application/vnd.wap.wmlscriptc');
mimetype.set('.wtb', 'application/vnd.webturbo');
mimetype.set('.wpd', 'application/vnd.wordperfect');
mimetype.set('.wqd', 'application/vnd.wqd');
mimetype.set('.stf', 'application/vnd.wt.stf');
mimetype.set('.xar', 'application/vnd.xara');
mimetype.set('.xfdl', 'application/vnd.xfdl');
mimetype.set('.hvd', 'application/vnd.yamaha.hv-dic');
mimetype.set('.hvs', 'application/vnd.yamaha.hv-script');
mimetype.set('.hvp', 'application/vnd.yamaha.hv-voice');
mimetype.set('.osf', 'application/vnd.yamaha.openscoreformat');
mimetype.set('.osfpvg', 'application/vnd.yamaha.openscoreformat.osfpvg+xml');
mimetype.set('.saf', 'application/vnd.yamaha.smaf-audio');
mimetype.set('.spf', 'application/vnd.yamaha.smaf-phrase');
mimetype.set('.cmp', 'application/vnd.yellowriver-custom-menu');
mimetype.set('.zir,.zirz', 'application/vnd.zul');
mimetype.set('.zaz', 'application/vnd.zzazz.deck+xml');
mimetype.set('.vxml', 'application/voicexml+xml');
mimetype.set('.hlp', 'application/winhlp');
mimetype.set('.wsdl', 'application/wsdl+xml');
mimetype.set('.wspolicy', 'application/wspolicy+xml');
mimetype.set('.abw', 'application/x-abiword');
mimetype.set('.ace', 'application/x-ace-compressed');
mimetype.set('.aab,.x32,.u32,.vox', 'application/x-authorware-bin');
mimetype.set('.aam', 'application/x-authorware-map');
mimetype.set('.aas', 'application/x-authorware-seg');
mimetype.set('.bcpio', 'application/x-bcpio');
mimetype.set('.torrent', 'application/x-bittorrent');
mimetype.set('.bz', 'application/x-bzip');
mimetype.set('.bz2,.boz', 'application/x-bzip2');
mimetype.set('.vcd', 'application/x-cdlink');
mimetype.set('.chat', 'application/x-chat');
mimetype.set('.pgn', 'application/x-chess-pgn');
mimetype.set('.cpio', 'application/x-cpio');
mimetype.set('.csh', 'application/x-csh');
mimetype.set('.deb,.udeb', 'application/x-debian-package');
mimetype.set(
  '.dir,.dcr,.dxr,.cst,.cct,.cxt,.w3d,.fgd,.swa',
  'application/x-director'
);
mimetype.set('.wad', 'application/x-doom');
mimetype.set('.ncx', 'application/x-dtbncx+xml');
mimetype.set('.dtb', 'application/x-dtbook+xml');
mimetype.set('.res', 'application/x-dtbresource+xml');
mimetype.set('.dvi', 'application/x-dvi');
mimetype.set('.bdf', 'application/x-font-bdf');
mimetype.set('.gsf', 'application/x-font-ghostscript');
mimetype.set('.psf', 'application/x-font-linux-psf');
mimetype.set('.otf', 'application/x-font-otf');
mimetype.set('.pcf', 'application/x-font-pcf');
mimetype.set('.snf', 'application/x-font-snf');
mimetype.set('.ttf,.ttc', 'application/x-font-ttf');
mimetype.set('.woff', 'application/font-woff');
mimetype.set('.pfa,.pfb,.pfm,.afm', 'application/x-font-type1');
mimetype.set('.spl', 'application/x-futuresplash');
mimetype.set('.gnumeric', 'application/x-gnumeric');
mimetype.set('.gtar', 'application/x-gtar');
mimetype.set('.hdf', 'application/x-hdf');
mimetype.set('.jnlp', 'application/x-java-jnlp-file');
mimetype.set('.latex', 'application/x-latex');
mimetype.set('.prc,.mobi', 'application/x-mobipocket-ebook');
mimetype.set('.application', 'application/x-ms-application');
mimetype.set('.wmd', 'application/x-ms-wmd');
mimetype.set('.wmz', 'application/x-ms-wmz');
mimetype.set('.xbap', 'application/x-ms-xbap');
mimetype.set('.mdb', 'application/x-msaccess');
mimetype.set('.obd', 'application/x-msbinder');
mimetype.set('.crd', 'application/x-mscardfile');
mimetype.set('.clp', 'application/x-msclip');
mimetype.set('.exe,.dll,.com,.bat,.msi', 'application/x-msdownload');
mimetype.set('.mvb,.m13,.m14', 'application/x-msmediaview');
mimetype.set('.wmf', 'application/x-msmetafile');
mimetype.set('.mny', 'application/x-msmoney');
mimetype.set('.pub', 'application/x-mspublisher');
mimetype.set('.scd', 'application/x-msschedule');
mimetype.set('.trm', 'application/x-msterminal');
mimetype.set('.wri', 'application/x-mswrite');
mimetype.set('.nc,.cdf', 'application/x-netcdf');
mimetype.set('.p12,.pfx', 'application/x-pkcs12');
mimetype.set('.p7b,.spc', 'application/x-pkcs7-certificates');
mimetype.set('.p7r', 'application/x-pkcs7-certreqresp');
mimetype.set('.rar', 'application/x-rar-compressed');
mimetype.set('.sh', 'application/x-sh');
mimetype.set('.shar', 'application/x-shar');
mimetype.set('.swf', 'application/x-shockwave-flash');
mimetype.set('.xap', 'application/x-silverlight-app');
mimetype.set('.sit', 'application/x-stuffit');
mimetype.set('.sitx', 'application/x-stuffitx');
mimetype.set('.sv4cpio', 'application/x-sv4cpio');
mimetype.set('.sv4crc', 'application/x-sv4crc');
mimetype.set('.tar', 'application/x-tar');
mimetype.set('.tcl', 'application/x-tcl');
mimetype.set('.tex', 'application/x-tex');
mimetype.set('.tfm', 'application/x-tex-tfm');
mimetype.set('.texinfo,.texi', 'application/x-texinfo');
mimetype.set('.ustar', 'application/x-ustar');
mimetype.set('.src', 'application/x-wais-source');
mimetype.set('.der,.crt', 'application/x-x509-ca-cert');
mimetype.set('.fig', 'application/x-xfig');
mimetype.set('.xpi', 'application/x-xpinstall');
mimetype.set('.xenc', 'application/xenc+xml');
mimetype.set('.xhtml,.xht', 'application/xhtml+xml');
mimetype.set('.xml,.xsl', 'application/xml');
mimetype.set('.dtd', 'application/xml-dtd');
mimetype.set('.xop', 'application/xop+xml');
mimetype.set('.xslt', 'application/xslt+xml');
mimetype.set('.xspf', 'application/xspf+xml');
mimetype.set('.mxml,.xhvml,.xvml,.xvm', 'application/xv+xml');
mimetype.set('.zip', 'application/zip');
mimetype.set('.adp', 'audio/adpcm');
mimetype.set('.au,.snd', 'audio/basic');
mimetype.set('.mid,.midi,.kar,.rmi', 'audio/midi');
mimetype.set('.mp4a', 'audio/mp4');
mimetype.set('.m4a,.m4p', 'audio/mp4a-latm');
mimetype.set('.mpga,.mp2,.mp2a,.mp3,.m2a,.m3a', 'audio/mpeg');
mimetype.set('.oga,.ogg,.spx', 'audio/ogg');
mimetype.set('.eol', 'audio/vnd.digital-winds');
mimetype.set('.dts', 'audio/vnd.dts');
mimetype.set('.dtshd', 'audio/vnd.dts.hd');
mimetype.set('.lvp', 'audio/vnd.lucent.voice');
mimetype.set('.pya', 'audio/vnd.ms-playready.media.pya');
mimetype.set('.ecelp4800', 'audio/vnd.nuera.ecelp4800');
mimetype.set('.ecelp7470', 'audio/vnd.nuera.ecelp7470');
mimetype.set('.ecelp9600', 'audio/vnd.nuera.ecelp9600');
mimetype.set('.aac', 'audio/x-aac');
mimetype.set('.aif,.aiff,.aifc', 'audio/x-aiff');
mimetype.set('.m3u', 'audio/x-mpegurl');
mimetype.set('.wax', 'audio/x-ms-wax');
mimetype.set('.wma', 'audio/x-ms-wma');
mimetype.set('.ram,.ra', 'audio/x-pn-realaudio');
mimetype.set('.rmp', 'audio/x-pn-realaudio-plugin');
mimetype.set('.wav', 'audio/x-wav');
mimetype.set('.cdx', 'chemical/x-cdx');
mimetype.set('.cif', 'chemical/x-cif');
mimetype.set('.cmdf', 'chemical/x-cmdf');
mimetype.set('.cml', 'chemical/x-cml');
mimetype.set('.csml', 'chemical/x-csml');
mimetype.set('.xyz', 'chemical/x-xyz');
mimetype.set('.bmp', 'image/bmp');
mimetype.set('.cgm', 'image/cgm');
mimetype.set('.g3', 'image/g3fax');
mimetype.set('.gif', 'image/gif');
mimetype.set('.ief', 'image/ief');
mimetype.set('.jp2', 'image/jp2');
mimetype.set('.jpeg,.jpg,.jpe', 'image/jpeg');
mimetype.set('.pict,.pic,.pct', 'image/pict');
mimetype.set('.png', 'image/png');
mimetype.set('.btif', 'image/prs.btif');
mimetype.set('.svg,.svgz', 'image/svg+xml');
mimetype.set('.tiff,.tif', 'image/tiff');
mimetype.set('.psd', 'image/vnd.adobe.photoshop');
mimetype.set('.djvu,.djv', 'image/vnd.djvu');
mimetype.set('.dwg', 'image/vnd.dwg');
mimetype.set('.dxf', 'image/vnd.dxf');
mimetype.set('.fbs', 'image/vnd.fastbidsheet');
mimetype.set('.fpx', 'image/vnd.fpx');
mimetype.set('.fst', 'image/vnd.fst');
mimetype.set('.mmr', 'image/vnd.fujixerox.edmics-mmr');
mimetype.set('.rlc', 'image/vnd.fujixerox.edmics-rlc');
mimetype.set('.mdi', 'image/vnd.ms-modi');
mimetype.set('.npx', 'image/vnd.net-fpx');
mimetype.set('.wbmp', 'image/vnd.wap.wbmp');
mimetype.set('.xif', 'image/vnd.xiff');
mimetype.set('.ras', 'image/x-cmu-raster');
mimetype.set('.cmx', 'image/x-cmx');
mimetype.set('.fh,.fhc,.fh4,.fh5,.fh7', 'image/x-freehand');
mimetype.set('.ico', 'image/x-icon');
mimetype.set('.pntg,.pnt,.mac', 'image/x-macpaint');
mimetype.set('.pcx', 'image/x-pcx');
//mimetype.set(".pic,.pct", "image/x-pict");
mimetype.set('.pnm', 'image/x-portable-anymap');
mimetype.set('.pbm', 'image/x-portable-bitmap');
mimetype.set('.pgm', 'image/x-portable-graymap');
mimetype.set('.ppm', 'image/x-portable-pixmap');
mimetype.set('.qtif,.qti', 'image/x-quicktime');
mimetype.set('.rgb', 'image/x-rgb');
mimetype.set('.xbm', 'image/x-xbitmap');
mimetype.set('.xpm', 'image/x-xpixmap');
mimetype.set('.xwd', 'image/x-xwindowdump');
mimetype.set('.eml,.mime', 'message/rfc822');
mimetype.set('.igs,.iges', 'model/iges');
mimetype.set('.msh,.mesh,.silo', 'model/mesh');
mimetype.set('.dwf', 'model/vnd.dwf');
mimetype.set('.gdl', 'model/vnd.gdl');
mimetype.set('.gtw', 'model/vnd.gtw');
mimetype.set('.mts', 'model/vnd.mts');
mimetype.set('.vtu', 'model/vnd.vtu');
mimetype.set('.wrl,.vrml', 'model/vrml');
mimetype.set('.ics,.ifb', 'text/calendar');
mimetype.set('.css', 'text/css');
mimetype.set('.csv', 'text/csv');
mimetype.set('.html,.htm', 'text/html');
mimetype.set('.txt,.text,.conf,.def,.list,.log,.in', 'text/plain');
mimetype.set('.dsc', 'text/prs.lines.tag');
mimetype.set('.rtx', 'text/richtext');
mimetype.set('.sgml,.sgm', 'text/sgml');
mimetype.set('.tsv', 'text/tab-separated-values');
mimetype.set('.t,.tr,.roff,.man,.me,.ms', 'text/troff');
mimetype.set('.uri,.uris,.urls', 'text/uri-list');
mimetype.set('.curl', 'text/vnd.curl');
mimetype.set('.dcurl', 'text/vnd.curl.dcurl');
mimetype.set('.scurl', 'text/vnd.curl.scurl');
mimetype.set('.mcurl', 'text/vnd.curl.mcurl');
mimetype.set('.fly', 'text/vnd.fly');
mimetype.set('.flx', 'text/vnd.fmi.flexstor');
mimetype.set('.gv', 'text/vnd.graphviz');
mimetype.set('.3dml', 'text/vnd.in3d.3dml');
mimetype.set('.spot', 'text/vnd.in3d.spot');
mimetype.set('.jad', 'text/vnd.sun.j2me.app-descriptor');
mimetype.set('.wml', 'text/vnd.wap.wml');
mimetype.set('.wmls', 'text/vnd.wap.wmlscript');
mimetype.set('.s,.asm', 'text/x-asm');
mimetype.set('.c,.cc,.cxx,.cpp,.h,.hh,.dic', 'text/x-c');
mimetype.set('.f,.for,.f77,.f90', 'text/x-fortran');
mimetype.set('.p,.pas', 'text/x-pascal');
mimetype.set('.java', 'text/x-java-source');
mimetype.set('.etx', 'text/x-setext');
mimetype.set('.uu', 'text/x-uuencode');
mimetype.set('.vcs', 'text/x-vcalendar');
mimetype.set('.vcf', 'text/x-vcard');
mimetype.set('.3gp', 'video/3gpp');
mimetype.set('.3g2', 'video/3gpp2');
mimetype.set('.h261', 'video/h261');
mimetype.set('.h263', 'video/h263');
mimetype.set('.h264', 'video/h264');
mimetype.set('.jpgv', 'video/jpeg');
mimetype.set('.jpm,.jpgm', 'video/jpm');
mimetype.set('.mj2,.mjp2', 'video/mj2');
mimetype.set('.mp4,.mp4v,.mpg4,.m4v', 'video/mp4');
mimetype.set('.mkv,.mk3d,.mka,.mks', 'video/x-matroska');
mimetype.set('.webm', 'video/webm');
mimetype.set('.mpeg,.mpg,.mpe,.m1v,.m2v', 'video/mpeg');
mimetype.set('.ogv', 'video/ogg');
mimetype.set('.qt,.mov', 'video/quicktime');
mimetype.set('.fvt', 'video/vnd.fvt');
mimetype.set('.mxu,.m4u', 'video/vnd.mpegurl');
mimetype.set('.pyv', 'video/vnd.ms-playready.media.pyv');
mimetype.set('.viv', 'video/vnd.vivo');
mimetype.set('.dv,.dif', 'video/x-dv');
mimetype.set('.f4v', 'video/x-f4v');
mimetype.set('.fli', 'video/x-fli');
mimetype.set('.flv', 'video/x-flv');
//mimetype.set(".m4v", "video/x-m4v");
mimetype.set('.asf,.asx', 'video/x-ms-asf');
mimetype.set('.wm', 'video/x-ms-wm');
mimetype.set('.wmv', 'video/x-ms-wmv');
mimetype.set('.wmx', 'video/x-ms-wmx');
mimetype.set('.wvx', 'video/x-ms-wvx');
mimetype.set('.avi', 'video/x-msvideo');
mimetype.set('.movie', 'video/x-sgi-movie');
mimetype.set('.ice', 'x-conference/x-cooltalk');
mimetype.set('.indd', 'application/x-indesign');
mimetype.set('.dat', 'application/octet-stream');

// Compressed files
// Based on notes at http://en.wikipedia.org/wiki/List_of_archive_formats
mimetype.set('.gz', 'application/x-gzip');
mimetype.set('.tgz', 'application/x-tar');
mimetype.set('.tar', 'application/x-tar');

// Not really sure about these...
mimetype.set('.epub', 'application/epub+zip');
mimetype.set('.mobi', 'application/x-mobipocket-ebook');

// Here's some common special cases without filename extensions
mimetype.set(
  'README,LICENSE,COPYING,TODO,ABOUT,AUTHORS,CONTRIBUTORS',
  'text/plain'
);
mimetype.set('manifest,.manifest,.mf,.appcache', 'text/cache-manifest');

export default mimetype;
