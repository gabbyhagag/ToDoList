using System;

namespace ToDoList.Models.Entity
{
    public class Mission
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }

        public Mission()
        {
            Id = Guid.NewGuid().ToString();
        }

        public Mission(string title, string imageUrl)
        {
            Id = Guid.NewGuid().ToString();
            Title = title;
            ImageUrl = imageUrl;
        }

    }
}
