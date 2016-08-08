(function(window) {
  window.esriLoadConfig = {
      modules: [
      'esri/Map',
      'esri/views/MapView',
      'esri/core/Collection',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/geometry/SpatialReference',      
      'esri/Color',
	  'esri/widgets/Locate',
	  'esri/widgets/Search',
	  'esri/tasks/Locator',
	  'esri/layers/FeatureLayer',
	  'esri/renderers/SimpleRenderer',
	  'esri/symbols/SimpleMarkerSymbol',
	  'esri/PopupTemplate',
	  'esri/symbols/TextSymbol',	  
	  'esri/layers/support/Field',
	  'esri/renderers/SimpleRenderer',
	  'esri/PopupTemplate',
	  'esri/geometry/Extent',
	  'esri/geometry/support/webMercatorUtils',
	  'esri/symbols/PictureMarkerSymbol'
	  
    ]
  };
}(window))