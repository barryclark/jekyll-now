class Footnotes {

	constructor() {

		var tag = document.getElementsByClassName( 'footnotes' );

		if( !tag.length ) {
			return;
		}

		var footnotes = tag[0].firstChild.childNodes;

		for( var i = footnotes.length; i--; ) {

			var note = footnotes[i],
				id = note.getAttribute( 'id' ).slice( -1 ),
				origin = document.getElementById( 'fnref:' + id );

			note.getElementsByClassName( 'reversefootnote' )[0].remove();

			this.spawnPlacebo( note, origin, id );

		}

		this.popup = document.querySelector( '.note' );

	}

	openNote( me, event ) {

		var popup = this.popup,
			status = popup.classList.contains( 'shown' );

		if( status ) {

			var current = document.querySelector( '[data-note].open' );
			this.closeNote( current );

		}

		document.body.addEventListener( 'click', function( event ) {
			this.closeNote( me );
		}.bind( this ));

		popup.innerHTML = me.getAttribute( 'data-note' );

		setTimeout( function() {

			popup.className = popup.className + ' shown';

			popup.addEventListener( 'click', function( event ) {
				event.stopPropagation();
			});

		}, 100 );

		me.setAttribute( 'class', 'open' );

	}

	closeNote( ele ) {

		this.popup.setAttribute( 'class', 'note' );
		ele.removeAttribute( 'class' );

		document.body.onclick = null;

	}

	spawnPlacebo( note, ref, id ) {

		var placebo = document.createElement( 'span' ),
			content = note.firstChild.innerHTML,
			it = this;

		placebo.setAttribute( 'data-note', content );
		placebo.innerHTML = id;

		placebo.addEventListener( 'click', function( event ) {

			if( this.classList.contains( 'open' ) ) {

				it.closeNote( this );

			} else {

				it.openNote( this, event );

			}

			event.stopPropagation();

		});

		ref.parentNode.replaceChild( placebo, ref );

	}

}

new Footnotes();