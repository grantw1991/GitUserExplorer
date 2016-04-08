using System;

namespace GitUserExplorer.Domain.Common
{
    public interface IUser
    {
        int Id { get; set; }
        string Login { get; set; }
        string AvatarUrl { get; set; }
        int? GravatarId { get; set; }
        string Url { get; set; }
        string HtmlUrl { get; set; }
        string FollowersUrl { get; set; }
        string FollowingUrl { get; set; }
        string GistsUrl { get; set; }
        string StarredUrl { get; set; }
        string SubscriptionsUrl { get; set; }
        string OrganisationsUrl { get; set; }
        string RepositoriesUrl { get; set; }
        string EventsUrl { get; set; }
        string ReievedEventsUrl { get; set; }
        string Type { get; set; }
        bool SiteAdmin { get; set; }
        string Name { get; set; }
        string Company { get; set; }
        string Blog { get; set; }
        string Location { get; set; }
        string Email { get; set; }
        int PublicRepositories { get; set; }
        int PublicGists { get; set; }
        int Followers { get; set; }
        int Following { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}
