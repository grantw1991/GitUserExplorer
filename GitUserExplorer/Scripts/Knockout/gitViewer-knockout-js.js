(function () {

    // setup the validation from - (http://knockoutjs.com/documentation/extenders.html) 
    ko.extenders.required = function (target, overrideMessage) {

        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        function validate(newValue) {
            target.hasError(newValue ? false : true);
            target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
        }

        validate(target());
        target.subscribe(validate);
        return target;
    };

    // the view models data handler
    var ViewModel = function () {

        var self = this;
        self.showErrorMessage = ko.observable(false);
        self.searchText = ko.observable().extend({ required: "Enter a github user" });
        self.user = ko.observable({ name: "No User", location: "...", avatar_url: "https://help.github.com/assets/images/help/profile/identicon.png", repos_url: "", html_url: '#' });
        self.repos = ko.observable([]);

        function resetUserDetails() {
            self.user({ name: "No User", location: "...", avatar_url: "https://help.github.com/assets/images/help/profile/identicon.png", repos_url: "" });
            self.repos([]);
            self.searchText().validationMessage("Could not find user: " + self.searchText());
        }

        // binding for search button click
        self.searchForUser = function () {

            self.showErrorMessage(self.searchText.hasError);

            if (self.searchText() === undefined || self.searchText() === null || self.searchText() === '')
                return;

            $.getJSON("https://api.github.com/users/" + self.searchText(), function (data) {
                self.user(data);
                loadUserRepositories(data.repos_url);
            }).error(function () {
                resetUserDetails();
            });
        };

        function loadUserRepositories(repoUrl) {

            $.getJSON(repoUrl, function (data) {

                // knockout does not have sorting like angular so it needs to be done manually
                data.sort(function (a, b) {
                    return b.stargazers_count - a.stargazers_count;
                });

                // knockout does not having limiting on looping, this selects the top 5
                var top5 = [];
                for (var i = 0; i < 5; i++) {
                    if (data.length <= i)
                        break;
                    top5.push(data[i]);
                }

                self.repos(top5);
            }).error(function () {
                resetUserDetails();
            });
        }
    };

    // this will apply the bindings
    ko.applyBindings(new ViewModel());

})();