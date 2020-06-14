using cpat_core.DataAccess.DataControl.Mongo;
using cpat_core.DataAccess.Hubs;
using cpat_core.DataAccess.Hubs.Mongo;
using cpat_core.Hubs.Mongo;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Morcatko.AspNetCore.JsonMergePatch;

namespace cpat_core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AppPolicy",
                    builder =>
                    {
                        builder.AllowAnyHeader()
                                .AllowAnyMethod()
                                .WithOrigins("http://localhost:3000")
                                .AllowCredentials();
                    });
            });
            services.AddRouting(r => r.SuppressCheckForUnhandledSecurityMetadata = true);
            services.AddControllers();
            services.AddScoped<TargetDbService>();
            services.AddScoped<PersonDbService>();
            services.AddScoped<LocationDbService>();
            services.AddScoped<DeviceDbService>();
            services.AddScoped<CompanyDbService>();

            // Configure strongly typed settings objects
            //var appSettingsSection = Configuration.GetSection("ConnectionStrings");
            //services.Configure<AppSettings>(appSettingsSection);

            services
                .AddMvcCore()
                .AddNewtonsoftJsonMergePatch();

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AppPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatHub");
                endpoints.MapHub<TargetHub>("/targetHub");
                endpoints.MapHub<PersonHub>("/personHub");
                endpoints.MapHub<LocationHub>("/locationHub");
                endpoints.MapHub<DeviceHub>("/deviceHub");
                endpoints.MapHub<CompanyHub>("/companyHub");
            });
        }
    }
}
