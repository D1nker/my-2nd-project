jQuery(document).ready(function($) {

    // The number of the next page to load (/page/x/).
    var pageNum = parseInt(load_more.startPage) + 1;

    // The maximum number of pages the current query can return.
    var max = parseInt(load_more.maxPages);

    // The link of the next page of posts.
    var nextLink = load_more.nextLink;

    /**
     * Replace the traditional navigation with our own,
     * but only if there is at least one page of new posts to load.
     */
    if (pageNum <= max) {
        // Insert the "More Posts" link.
        $('main')
            .append('<div class="load-more-placeholder-' + pageNum + '"></div>')
            .append('<p id="load-more-load-posts"><a href="#">Load More Posts</a></p>');

        // Remove the traditional navigation.
        $('.navigation').remove();
    }


    /**
     * Load new posts when the link is clicked.
     */
    $('#load-more-load-posts a').click(function() {

        // Are there more posts to load?
        if (pageNum <= max) {

            // Show that we're working.
            $(this).text('Loading posts...');

            $('.load-more-placeholder-' + pageNum).load(nextLink + ' .post',
                function() {
                    // Update page number and nextLink.
                    pageNum++;
                    nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/' + pageNum);

                    // Add a new placeholder, for when user clicks again.
                    $('#load-more-load-posts')
                        .before('<div class="load-more-placeholder-' + pageNum + '"></div>')

                    // Update the button message.
                    if (pageNum <= max) {
                        $('#load-more-load-posts a').text('Load More Posts');
                    } else {
                        $('#load-more-load-posts a').text('No more posts to load.');
                    }
                }
            );
        } else {
            $('#load-more-load-posts a').append('.');
        }

        return false;
    });
});
