using GitUserExplorer.Domain;
using GitUserExplorer.Domain.Common;
using Ninject.Modules;

namespace GitUserExplorer.Composition
{
    public class CompositionModule : NinjectModule
    {
        public override void Load()
        {
            BindDomainLevelDependencies();
        }

        private void BindDomainLevelDependencies()
        {
            base.Kernel.Bind<IUser>().To<User>();
        }
    }
}
