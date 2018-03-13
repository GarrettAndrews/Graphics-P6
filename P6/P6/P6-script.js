function start() { "use strict";

    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var m4 = twgl.m4;

    // sliders for controlling angles and texture maps
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;

    // shader sources
    var vertexSource = document.getElementById("vs").text;
    var fragmentSource = document.getElementById("fs").text;

    // compile shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader)); return null; }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vTexCoord");
    gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);
    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);

    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MVNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");

    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "tex1");
    gl.uniform1i(shaderProgram.tex1, 0);

    var vertexPos = new Float32Array(
        [ 55.387396398183,44.0727575591802,21.61545748464, 31.9432361318135,22.166045606393,0.0, 1.0871401282578,32.0679092788902,21.61545748464,
            42.728402029474,-27.4758741445587,133.326801643331, 55.387396398183,44.0727575591802,21.61545748464, 1.0871401282578,32.0679092788902,21.61545748464,
            42.728402029474,-27.4758741445587,133.326801643331, 30.069407660765,-99.0245058482976,21.61545748464, 84.3696639306903,-87.0196575680076,21.61545748464,
            42.728402029474,-27.4758741445587,133.326801643331, 102.272185452923,14.1653877566575,21.61545748464, 55.387396398183,44.0727575591802,21.61545748464,
            0.0,0.0,0.0, 15.2525278849152,-70.2042761740327,0.0, -6.91351772147776,-38.2610400422193,0.0,
            15.2525278849152,-70.2042761740327,0.0, 0.0,0.0,0.0, 31.9432361318135,22.166045606393,0.0,
            15.2525278849152,-70.2042761740327,0.0, 31.9432361318135,22.166045606393,0.0, 53.5135679271345,-77.1177938955105,0.0,
            53.5135679271345,-77.1177938955105,0.0, 31.9432361318135,22.166045606393,0.0, 70.2042761740328,15.2525278849153,0.0,
            53.5135679271345,-77.1177938955105,0.0, 70.2042761740328,15.2525278849153,0.0, 85.4568040589482,-54.9517482891175,0.0,
            85.4568040589482,-54.9517482891175,0.0, 70.2042761740328,15.2525278849153,0.0, 92.3703217804259,-16.6907082468983,0.0,
            102.272185452923,14.1653877566575,21.61545748464, 70.2042761740328,15.2525278849153,0.0, 55.387396398183,44.0727575591802,21.61545748464,
            42.728402029474,-27.4758741445587,133.326801643331, 114.277033733213,-40.1348685132676,21.61545748464, 84.3696639306903,-87.0196575680076,21.61545748464,
            1.0871401282578,32.0679092788902,21.61545748464, -28.8202296742649,-14.8168797758501,21.61545748464, 42.728402029474,-27.4758741445587,133.326801643331,
            114.277033733213,-40.1348685132676,21.61545748464, 84.3696639306903,-87.0196575680076,21.61545748464, 85.4568040589482,-54.9517482891175,0.0,
            70.2042761740328,15.2525278849153,0.0, 31.9432361318135,22.166045606393,0.0, 55.387396398183,44.0727575591802,21.61545748464,
            1.0871401282578,32.0679092788902,21.61545748464, 0.0,0.0,0.0, -28.8202296742649,-14.8168797758501,21.61545748464,
            102.272185452923,14.1653877566575,21.61545748464, 42.728402029474,-27.4758741445587,133.326801643331, 114.277033733213,-40.1348685132676,21.61545748464,
            102.272185452923,14.1653877566575,21.61545748464, 114.277033733213,-40.1348685132676,21.61545748464, 92.3703217804259,-16.6907082468983,0.0,
            -28.8202296742649,-14.8168797758501,21.61545748464, -16.8153813939749,-69.117136045775,21.61545748464, -6.91351772147776,-38.2610400422193,0.0,
            -28.8202296742649,-14.8168797758501,21.61545748464, -16.8153813939749,-69.117136045775,21.61545748464, 42.728402029474,-27.4758741445587,133.326801643331,
            -16.8153813939749,-69.117136045775,21.61545748464, 15.2525278849152,-70.2042761740327,0.0, 30.069407660765,-99.0245058482976,21.61545748464,
            42.728402029474,-27.4758741445587,133.326801643331, -16.8153813939749,-69.117136045775,21.61545748464, 30.069407660765,-99.0245058482976,21.61545748464,
            30.069407660765,-99.0245058482976,21.61545748464, 53.5135679271345,-77.1177938955105,0.0, 84.3696639306903,-87.0196575680076,21.61545748464,
            0.0,0.0,0.0, -28.8202296742649,-14.8168797758501,21.61545748464, -6.91351772147776,-38.2610400422193,0.0,
            15.2525278849152,-70.2042761740327,0.0, -16.8153813939749,-69.117136045775,21.61545748464, -6.91351772147776,-38.2610400422193,0.0,
            53.5135679271345,-77.1177938955105,0.0, 30.069407660765,-99.0245058482976,21.61545748464, 15.2525278849152,-70.2042761740327,0.0,
            114.277033733213,-40.1348685132676,21.61545748464, 85,4568040589482,-54.9517482891175,0.0, 92.3703217804259,-16.6907082468983,0.0,
            85.4568040589482,-54.9517482891175,0.0, 84.3696639306903,-87.0196575680076,21.61545748464, 53.5135679271345,-77.1177938955105,0.0,
            31.9432361318135,22.166045606393,0.0, 0.0,0.0,0.0, 1.0871401282578,32.0679092788902,21.61545748464,
            102.272185452923,14.1653877566575,21.61545748464, 92.3703217804259,-16.6907082468983,0.0, 70.2042761740328,15.2525278849153,0.0]
    );

    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 90;

    var vertexNormals = new Float32Array(
        [ -0.17224475744216,0.779096432698478,-0.602777315507308, -0.17224475744216,0.779096432698478,-0.602777315507308, -0.17224475744216,0.779096432698478,-0.602777315507308,
            -0.185032348164165,0.836937184790269,0.515072013264353, -0.185032348164165,0.836937184790269,0.515072013264353, -0.185032348164165,0.836937184790269,0.515072013264353,
            0.185032348164165,-0.836937184790269,0.515072013264353, 0.185032348164165,-0.836937184790269,0.515072013264353, 0.185032348164165,-0.836937184790269,0.515072013264353,
            0.460966330666627,0.722641586918129,0.515072013264354, 0.460966330666627,0.722641586918129,0.515072013264354, 0.460966330666627,0.722641586918129,0.515072013264354,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,0.0,-1.0,
            0.429108934748159,0.672699806770525,-0.60277731550731, 0.429108934748159,0.672699806770525,-0.60277731550731, 0.429108934748159,0.672699806770525,-0.60277731550731,
            -0.722641586918129,0.460966330666627,-0.515072013264353, -0.722641586918129,0.460966330666627,-0.515072013264353, -0.722641586918129,0.460966330666627,-0.515072013264353,
            -0.72264158691813,0.460966330666625,0.515072013264353, -0.72264158691813,0.460966330666625,0.515072013264353, -0.72264158691813,0.460966330666625,0.515072013264353,
            0.672699806770526,-0.429108934748161,-0.602777315507307, 0.672699806770526,-0.429108934748161,-0.602777315507307, 0.672699806770526,-0.429108934748161,-0.602777315507307,
            0.114385122179081,0.633034283882981,-0.765626305225231, 0.114385122179081,0.633034283882981,-0.765626305225231, 0.114385122179081,0.633034283882981,-0.765626305225231,
            -0.672699806770527,0.429108934748159,-0.602777315507308, -0.672699806770527,0.429108934748159,-0.602777315507308, -0.672699806770527,0.429108934748159,-0.602777315507308,
            0.836937184790269,0.185032348164166,0.515072013264354, 0.836937184790269,0.185032348164166,0.515072013264354, 0.836937184790269,0.185032348164166,0.515072013264354,
            0.779096432698478,0.17224475744216,-0.602777315507309, 0.779096432698478,0.17224475744216,-0.602777315507309, 0.779096432698478,0.17224475744216,-0.602777315507309,
            0.779096432698478,0.172244757442162,0.602777315507308, 0.779096432698478,0.172244757442162,0.602777315507308, 0.779096432698478,0.172244757442162,0.602777315507308,
            -0.836937184790268,-0.185032348164167,0.515072013264354, -0.836937184790268,-0.185032348164167,0.515072013264354, -0.836937184790268,-0.185032348164167,0.515072013264354,
            -0.429108934748159,-0.672699806770526,-0.602777315507309, -0.429108934748159,-0.672699806770526,-0.602777315507309, -0.429108934748159,-0.672699806770526,-0.602777315507309,
            -0.460966330666627,-0.722641586918129,0.515072013264353, -0.460966330666627,-0.722641586918129,0.515072013264353, -0.460966330666627,-0.722641586918129,0.515072013264353,
            0.172244757442159,-0.779096432698478,-0.602777315507308, 0.172244757442159,-0.779096432698478,-0.602777315507308, 0.172244757442159,-0.779096432698478,-0.602777315507308,
            0.633034283882982,-0.114385122179081,0.76562630522523, 0.633034283882982,-0.114385122179081,0.76562630522523, 0.633034283882982,-0.114385122179081,0.76562630522523,
            -0.528505330416907,-0.366740339297547,-0.765626305225229, -0.528505330416907,-0.366740339297547,-0.765626305225229, -0.528505330416907,-0.366740339297547,-0.765626305225229,
            -0.114385122179081,-0.633034283882982,-0.76562630522523, -0.114385122179081,-0.633034283882982,-0.76562630522523, -0.114385122179081,-0.633034283882982,-0.76562630522523,
            0.633034283882982,-0.114385122179081,-0.76562630522523, 0.633034283882982,-0.114385122179081,-0.76562630522523, 0.633034283882982,-0.114385122179081,-0.76562630522523,
            0.366740339297545,-0.528505330416907,-0.76562630522523, 0.366740339297545,-0.528505330416907,-0.76562630522523, 0.366740339297545,-0.528505330416907,-0.76562630522523,
            -0.366740339297547,0.528505330416906,-0.76562630522523, -0.366740339297547,0.528505330416906,-0.76562630522523, -0.366740339297547,0.528505330416906,-0.76562630522523,
            0.528505330416906,0.366740339297547,-0.76562630522523, 0.528505330416906,0.366740339297547,-0.76562630522523, 0.528505330416906,0.366740339297547,-0.76562630522523]
    );

    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = 90;

    var vertexColors = new Float32Array(
        [ 0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1,]
    );

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 90;

    var vertexTextureCoords = new Float32Array(
        [ 0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1,
            0,0, 1,0, 0,1]);

    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = 90;

    var triangleIndices = new Uint8Array(
        [0,1,2,
            3,4,5,
            6,7,8,
            9,10,11,
            12,13,14,
            15,16,17,
            18,19,20,
            21,22,23,
            24,25,26,
            27,28,29,
            30,31,32,
            33,34,35,
            36,37,38,
            39,40,41,
            42,43,44,
            45,46,47,
            48,49,50,
            51,52,53,
            54,55,56,
            57,58,59,
            60,61,62,
            63,64,65,
            66,67,68,
            69,70,71,
            72,73,74,
            75,76,77,
            84,85,86]
    );

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);

    // lets get some textures!
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    var texture3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image3 = new Image();

    var texture4 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image4 = new Image();

    var texture5 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image5 = new Image();

    function initText()
    {
        // it took me a while to realize I needed to conform to CORS policies and host my own images
        image1.onload = function() { loadTexture(image1,texture1); };
        image1.crossOrigin = "anonymous";
        image1.src = "https://farm5.staticflickr.com/4571/38322533841_0fc9dac39d_z.jpg";

        image2.onload = function() { loadTexture(image2,texture2); };
        image2.crossOrigin = "anonymous";
        image2.src = "https://farm5.staticflickr.com/4573/26548725309_8ee24aff5a_z.jpg";

        image3.onload = function() { loadTexture(image3,texture3); };
        image3.crossOrigin = "anonymous";
        image3.src = "https://farm5.staticflickr.com/4539/38322533761_e80d36ea4c_z.jpg";

        image4.onload = function() { loadTexture(image4,texture4); };
        image4.crossOrigin = "anonymous";
        image4.src = "https://farm5.staticflickr.com/4558/38267553506_ee7c942035_z.jpg";

        image5.onload = function() { loadTexture(image5,texture5); };
        image5.crossOrigin = "anonymous";
        image5.src = "https://farm5.staticflickr.com/4540/26548725419_54cbd38a73_z.jpg";

        window.setTimeout(draw,200);
    }


    function loadTexture(image,texture)
    {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    function draw() {
        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;
        var eye = [400*Math.sin(angle1),150.0,400.0*Math.cos(angle1)];
        var target = [0,0,0];
        var up = [0,1,0];

        var tModel = m4.multiply(m4.scaling([1,1,1]),m4.axisRotation([1,1,1],angle2));
        var tnModel = m4.axisRotation([1,1,1],angle2);
        var tCamera = m4.inverse(m4.lookAt(eye,target,up));
        var tProjection = m4.perspective(Math.PI/4,1,10,1000);

        var tMV=m4.multiply(tModel,tCamera);
        var tMVn=m4.multiply(tnModel,tCamera);
        var tMVP=m4.multiply(tMV,tProjection);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix4fv(shaderProgram.MVNormalmatrix,false,tMVn);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.texcoordAttribute, textureBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
            gl.FLOAT,false, 0, 0);

        if (slider3.value.valueOf() === "0") {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture1);
        }
        else if (slider3.value.valueOf() === "1") {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture2);
        }
        else if (slider3.value === "2") {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture3);
        }
        else if (slider3.value === "3") {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture4);
        }
        else if (slider3.value === "4") {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture5);
        }
        else {
            // default texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture1);
        }
        // draw
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    initText();

    // vertices were manually extracted from this thingiverse file: https://www.thingiverse.com/thing:2205979/#files, credit to the creator
}