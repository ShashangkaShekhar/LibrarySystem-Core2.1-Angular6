using DataModels.EntityModels;
using DataModels.ViewModels;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DataFactory.account
{
    public class AuthUsers
    {
        private LibraryDBContext _ctx = null;

        public AuthUsers()
        {
            _ctx = new LibraryDBContext();
        }

        public async Task<string> regusers(User model)
        {
            string message = string.Empty;

            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var ifExist = _ctx.User.SingleOrDefault(x => x.Email == model.Email);
                        if (ifExist == null)
                        {
                            var maxUser = _ctx.User.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;
                            //Save User
                            var UserModel = new User
                            {
                                Id = maxUser,
                                Userid = maxUser,
                                Firstname = model.Firstname,
                                Lastname = model.Lastname,
                                Email = model.Email,
                                Contact = model.Contact
                            };
                            _ctx.User.Add(UserModel);

                            var maxAuth = _ctx.UserAuthentication.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id) + 1;
                            //Save UserAuth
                            var UserAuthModel = new UserAuthentication
                            {
                                Id = maxAuth,
                                Userid = maxAuth,
                                Username = model.Email,
                                Userpass = model.Contact,
                                Joindate = Extension.Today
                            };
                            _ctx.UserAuthentication.Add(UserAuthModel);

                            await _ctx.SaveChangesAsync();

                            message = MessageConstants.Saved;
                        }
                        else
                        {
                            message = MessageConstants.Exist;
                        }

                        _ctxTransaction.Commit();
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = MessageConstants.SavedWarning;
                    }
                }
            }

            return message;
        }

        public async Task<vmLoggeduser> loginusers(UserAuthentication model)
        {
            string message = string.Empty;
            vmLoggeduser loggeduser = null;

            using (_ctx)
            {
                try
                {
                    var ifExist = _ctx.UserAuthentication.SingleOrDefault(x => x.Username == model.Username && x.Userpass == model.Userpass);
                    if (ifExist != null)
                    {
                        loggeduser = await (from ua in _ctx.UserAuthentication
                                            join ur in _ctx.User on ua.Userid equals ur.Userid
                                            where ua.Username == model.Username
                                            select new vmLoggeduser
                                            {
                                                Userid = ua.Userid,
                                                Username = ua.Username,
                                                Usertype = ur.Usertype,
                                                Displayname = ur.Firstname,
                                                Email = ur.Email
                                            }).FirstOrDefaultAsync();
                    }
                }
                catch (Exception e)
                {
                    e.ToString();
                    message = MessageConstants.AuthWarning;
                }
            }

            return loggeduser;
        }
    }
}
