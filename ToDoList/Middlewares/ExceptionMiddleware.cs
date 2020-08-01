using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ToDoList.Middlewares
{
    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        // Add - Error Log
                        context.Response.StatusCode = (int)GetErrorCode(contextFeature.Error);
                        await context.Response.WriteAsync(
                            new Error(contextFeature.Error.Message).ToString());
                    }
                });
            });
        }
        private static HttpStatusCode GetErrorCode(Exception exception)
        {
            switch (exception)
            {
                case NotImplementedException _:
                    return HttpStatusCode.NotImplemented; //501
                case ValidationException _:
                    return HttpStatusCode.BadRequest;
                default:
                    return HttpStatusCode.InternalServerError; //500
            }
        }
    }

    internal class Error
    {
        public string Message { get; set; }
        public Error(string message)
        {
            Message = message;
        }
        public override string ToString()
        {
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            return JsonConvert.SerializeObject(this, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
                Formatting = Formatting.Indented
            });
        }
    }
}
