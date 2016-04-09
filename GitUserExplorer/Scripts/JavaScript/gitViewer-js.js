(function () {

    $("#searchForm").validate({
        rules: { inputSearch: { required: true } },
        messages: { inputSearch: { required: "Enter a github user" } }
    });

    $("#searchButton").on('click', function () {

        if ($('#searchForm').valid() === false)
            return;

        loadUser();
    });

    function loadUser() {
        $.ajax({
            url: 'https://api.github.com/users/' + $('#searchText').val(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (user) {
                loadUserRepos(user.repos_url);
                handleRequestedUser(user);
            },
            error: function (request) {
                clearUserDetails();
                console.log(JSON.parse(request.responseText));
            }
        });
    }

    function handleRequestedUser(user) {

        if (user === undefined || user === null) {
            clearUserDetails();
            return;
        }

        $('.img-thumbnail').attr('src', user.avatar_url);
        $('#name').text(user.name);
        $('#location').text(user.location);
        $('#viewUserProfile').attr('href', user.html_url);
        $('#followers').attr('href', user.html_url + '/followers');
    }

    function clearUserDetails() {
        $('.img-thumbnail').attr('src', 'https://help.github.com/assets/images/help/profile/identicon.png');
        $('#name').text('No User');
        $('#location').text('...');
        $('#viewUserProfile').attr('href', '#');
        $('#followers').attr('href', '#');
        $('#reposTable tbody').empty();
    }

    function loadUserRepos(userReposUrl) {

        if (userReposUrl == null)
            return;

        $.ajax({
            url: userReposUrl,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (repos) {
                handleRepos(repos);
            },
            error: function (request) {
                console.log(JSON.parse(request.responseText));
            }
        });
    }

    function handleRepos(repos) {

        $('#reposTable tbody').empty();
        if (repos == null || repos.length === 0) {
            return;
        }

        repos.sort(function (a, b) {
            return b.stargazers_count - a.stargazers_count;
        });

        var tbody = $('<tbody>');

        for (var i = 0; i < 5; i++) {

            if (repos.length <= i)
                break;

            var innerTr = $('<tr>');
            var body1 = $('<td>').text(i + 1);
            var body2 = $('<td>').text(repos[i].stargazers_count);
            var urlLink = $('<a target="_blank">').attr("href", repos[i].html_url).text(repos[i].description);
            var body3 = $('<td>').append(urlLink);
            var body4 = $('<td>').text(repos[i].language);
            var body5 = $('<td>').text(moment(repos[i].created_at).format('DD/MM/YYYY'));
            innerTr.append(body1, body2, body3, body4, body5);
            tbody.append(innerTr);
        }

        tbody.appendTo($('#reposTable'));
    }
})();