# seunimi_api

API for fetching episodes for the *Software Engineering* course
of Universita' di Milano.

### `/api/episode`

    {
        "n_episodes": <int>
    }

### `/api/episode/<id:int>`

    {
        "valid": <boolean>,
        "video_url": <string | null>,
        "authorization_token": <string | null>
    }

where `authorization_token` is a base64 encoded token,
needed to fetch the resource from the University server
for the [HTTP basic authentication protocol](https://tools.ietf.org/html/rfc2617).
