<h1>Gulp Projects</h1>
<p>Lightweight startup HTML5 template, based on Gulp.</p>

<p><strong>Author:</strong> GuiderWG</p>

<h2>How to use Gulp Projects</h2>

<pre>git clone http://github.com/GuiderWG/gulp-projects</pre>

<h2>Main Gulp tasks:</h2>

<ul>
	<li><strong title="gulp task"><em>gulp</em></strong>: run default gulp task ('img', 'styles', 'scripts', 'browser-sync', 'watch')</li>
	<li><strong title="cleanimg task"><em>cleanimg</em></strong>: Clean @*x responsive IMG's</li>
	<li><strong title="rsync task"><em>rsync</em></strong>: project deployment via <strong>RSYNC</strong></li>
</ul>

<h2>Basic rules</h2>

<ol>
	<li>All custom <strong title="scripts task"><em>scripts</em></strong> located in <strong>app/js/_custom.js</strong></li>
	<li>All custom <strong title="styles task"><em>styles</em></strong> located in <strong>app/sass/main.sass</strong></li>
	<li>All Sass <strong>vars</strong> placed in <strong>app/sass/_vars.sass</strong></li>
	<li>All <strong>fonts</strong> plug in <strong>app/sass/_fonts.sass</strong></li>
	<li>All CSS styles of <strong>libraries</strong> plug in <strong>app/sass/_libs.sass</strong></li>
	<li>All responsive <strong>images</strong> placed in <strong>app/img/_src/</strong> folder. All source images should initially have a 2x resolution. Result image folders after resize & compression: <strong>img/@1x/</strong> and <strong>img/@2x/</strong> accordingly.</li>
</ol>

<h2>Caching</h2>

<p>Rename <strong>ht.access</strong> to <strong>.htaccess</strong> before place it in your web server. This file contain rules for htaccess resources caching.</p>
