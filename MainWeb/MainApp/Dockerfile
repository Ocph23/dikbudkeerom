FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /app
COPY ./ ./

CMD ASPNETCORE_URLS=http://*:$PORT dotnet MainApp.dll