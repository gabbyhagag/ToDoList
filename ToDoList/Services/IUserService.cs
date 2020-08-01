using System.Collections.Generic;
using ToDoList.Models.Entity;

namespace ToDoList.Services
{
    public interface IUserService
    {
        public List<Mission> GetAllMissons(string userId);

        public User GetOrCreateUserById(string sessionId);

        public User AddNewUser(string sessionId);
    }
}
