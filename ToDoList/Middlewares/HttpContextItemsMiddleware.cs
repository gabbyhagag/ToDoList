using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace ToDoList.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class HttpContextItemsMiddleware
    {
        private readonly RequestDelegate _next;
        public static readonly object HttpContextItemsMiddlewareKey = new Object();

        public HttpContextItemsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (!httpContext.Session.IsAvailable)
            {
                throw new Exception("The session not available.");
            }

            string userId = httpContext.Session.GetString(Constants.SessionKey.USER_ID);
            if (string.IsNullOrEmpty(userId))
            {
                httpContext.Session.SetString(Constants.SessionKey.USER_ID, httpContext.Session.Id);
            }
            await _next(httpContext);

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class HttpContextItemsMiddlewareExtensions
    {
        public static IApplicationBuilder UseHttpContextItemsMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpContextItemsMiddleware>();
        }
    }
}
