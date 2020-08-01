using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models.Entity
{
    public class User
    {
        public string UserId { get; set; }
        public List<Mission> Missions { get; set; }

        public User(string userId)
        {
            UserId = userId;
            Missions = new List<Mission>();
        }
    }
}
