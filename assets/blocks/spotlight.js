(function(blocks, components, element) {
    var el = element.createElement;
 
    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px',
    };
 
    blocks.registerBlockType(
        'forty/spotlight',
        {
            title: 'Spotlight',
            icon: 'align-left',
            category: 'forty-theme',
            parent: ['forty/spotlight-section'],
            supports: {
                anchor: true,
                customClassName: false,
            },
            example: {},
            edit: function(props) {
            },
            save: function(props) {
            },
        }
    );
}(
    window.wp.blocks,
    window.wp.components,
    window.wp.element
) );

/* <section>
    <a href="generic.html" class="image">
        <img src="images/pic08.jpg" alt="" data-position="center center" />
    </a>
    <div class="content">
        <div class="inner">
            <header class="major">
                <h3>Orci maecenas</h3>
            </header>
            <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
            <ul class="actions">
                <li><a href="generic.html" class="button">Learn more</a></li>
            </ul>
        </div>
    </div>
</section> */