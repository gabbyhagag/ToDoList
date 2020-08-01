using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.Models.Entity;

namespace ToDoList.Services
{
    public class UserServise : IUserService
    {
        private List<User> _users;

        public UserServise()
        {
            _users = new List<User>();
        }

        public User AddNewUser(string userId)
        {
            User user = new User(userId);
            _users.Add(user);
            return user;
        }

        public List<Mission> GetAllMissons(string userId)
        {
            User user = _users.FirstOrDefault(user => user.UserId == userId);
            if (user != null)
                return _users.SelectMany(user => user.Missions).ToList();

            throw new Exception("You are not a registered user");
        }

        public User GetOrCreateUserById(string userId)
        {
            User user = _users.Find(user => user.UserId == userId);
            return user ?? AddNewUser(userId);
        }

    }
}
