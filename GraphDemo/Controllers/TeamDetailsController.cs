using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Identity;
using GraphDemo.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using Microsoft.Graph;

namespace GraphDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeamDetailsController : ControllerBase
    {
        private readonly ILogger<TeamDetailsController> _logger;
        private readonly MyConfiguration _myConfiguration;

        public TeamDetailsController(ILogger<TeamDetailsController> logger, IOptions<MyConfiguration> myConfiguration)
        {
            _logger = logger;
            _myConfiguration = myConfiguration.Value;
        }

        [HttpGet]
        [EnableCors()]
        public async Task<IActionResult> Get([System.Web.Http.FromUri] string teamId)
        {
            if (string.IsNullOrWhiteSpace(teamId))
            {
                teamId = "63d5b6bc-28c2-49c6-8bbc-de402c206e7d";
            }

            List<TeamDetail> teamChannels = await GetTeamChannels(teamId);
            return Ok(teamChannels);
        }

        public async Task<List<TeamDetail>> GetTeamChannels(string teamId)
        {
            List<TeamDetail> teamDetailList = new List<TeamDetail>();
            // The client credentials flow requires that you request the
            // /.default scope, and preconfigure your permissions on the
            // app registration in Azure. An administrator must grant consent
            // to those permissions beforehand.
            var scopes = new[] { "https://graph.microsoft.com/.default" };

            // Multi-tenant apps can use "common",
            // single-tenant apps must use the tenant ID from the Azure portal
            var tenantId = _myConfiguration.tenantId;

            // Values from app registration
            var clientId = _myConfiguration.clientId;
            var clientSecret = _myConfiguration.clientSecret;

            // using Azure.Identity;
            var options = new TokenCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
            };

            // https://docs.microsoft.com/dotnet/api/azure.identity.clientsecretcredential
            var clientSecretCredential = new ClientSecretCredential(
                tenantId, clientId, clientSecret, options);


            var graphClient = new GraphServiceClient(clientSecretCredential, scopes);

            var channel = await graphClient.Teams[teamId]
                .AllChannels
                .Request()
                .GetAsync();

            foreach (var item in channel.ToList())
            {
                teamDetailList.Add(new TeamDetail()
                {
                    Name = item.DisplayName,
                    Url = item.WebUrl,
                    CreatedDate = item.CreatedDateTime.ToString(),
                    Description = item.Description
                });
            }

            return teamDetailList;

        }
    }
}
