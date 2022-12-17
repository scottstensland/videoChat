let express = require( 'express' );
let app = express();
let server = require('http').createServer( app )
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );

app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen(process.env.PORT || 8080);

