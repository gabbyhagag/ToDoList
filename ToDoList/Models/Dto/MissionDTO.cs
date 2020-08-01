using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoList.Models.Dto
{
    public class MissionDTO
    {
        [Required]
        public IFormFile ImageFile { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "The title is too short")]
        [MaxLength(100, ErrorMessage = "The title is too long")]
        public string Title { get; set; }
    }
}
