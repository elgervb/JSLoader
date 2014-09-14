
document.addEventListener('DOMContentLoaded', function () {


	document.querySelector('.load').addEventListener('click', function(){

		/**
		 * Load JQuery from a CDN. Execute the callback when finished
		 */
		Loader.loadJs('https://code.jquery.com/jquery-2.1.1.js', function(){
			console.log('JQuery JS loaded');
		});


		/**
		 * Load JQuery css. Execute the callback when finished
		 */
		Loader.loadCss('https://codeorigin.jquery.com/jquery-wp-content/themes/jquery/css/base.css?v=1', function(){
			console.log('JQuery CSS loaded');
		});

	}, false);

	document.querySelector('.unload').addEventListener('click', function(){

		/**
		 * Load JQuery css. Execute the callback when finished
		 */
		Loader.unloadCss(/.*codeorigin\.jquery\.com.*/, function(regex, stylesheet){
			console.log('JQuery CSS removed ' + stylesheet);
		});

	});
	
});
