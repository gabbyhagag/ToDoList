using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.Models.Entity;
using ToDoList.Models.Dto;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using System.Data;

namespace ToDoList.Adapters
{
    public static class MissionAdapter
    {
        public static Mission FromMissionDTO(MissionDTO misssionDto)
        {
            // Saving Image on Server
            string imageUrl = GetImageUrlBySaveResources(misssionDto.ImageFile);
            return new Mission(misssionDto.Title, imageUrl);
        }

        private static string GetImageUrlBySaveResources(IFormFile file)
        {
            string folderRelativeName = Path.Combine("Resources", "Images");
            string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderRelativeName);

            if (file.Length > 0)
            {
                string fileName = ContentDispositionHeaderValue
                    .Parse(file.ContentDisposition).FileName.Trim('"');
                string fullPath = Path.Combine(pathToSave, fileName);
                string relativePath = Path.Combine(folderRelativeName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return relativePath;
            }
            throw new Exception("The file is null or empty");
        }
    }
}
