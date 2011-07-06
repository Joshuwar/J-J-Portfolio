/* bind navigation to frag ID changes

	example:
	
	$(document).ready(function() {
		startWatchingHash(function(currentHash, newHash) {
			loadNewPage(newHash);
		});
	});
*/
function setFragID(url,trim) {
	url = url || "";
	if(trim) {
		if(url.lastIndexOf('/')!==-1) {
			url = url.substring(url.lastIndexOf('/')+1);
		}
	}	
	window.location.hash = url;
}

function getFragID() {
	return window.location.hash.replace(/^#/,"");
}

function startWatchingHash(callback) {
	$(document).bind("hashChange", function(e, currentHash, newHash) {
		// do something
		if(callback) {
			callback(currentHash,newHash);
		}
	});
	(function() {
		var currentHash = arguments.callee.hash || "#",
			newHash = window.location.hash;
		if(newHash!==currentHash) {
			$(document).trigger('hashChange', [currentHash,newHash]);
			arguments.callee.hash = newHash;
		}
		window.setTimeout(arguments.callee,200);
	})();
}
