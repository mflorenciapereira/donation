(function(global) {  

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
    'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
    'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    'esri':                       'http://js.arcgis.com/4.0/esri',
	"socket.io-client": 		"https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.min.js"
	
 };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
	
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
	'forms'
  ];

  // Add map entries for each angular package
 
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName;
  });

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

 // Add package entries for angular packages
  ngPackageNames.forEach(packUmd);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);