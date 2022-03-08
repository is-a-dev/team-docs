# Reviewing Pull Requests
There are a few things you'll need to look out for when reviewing pull requests for domain registrations. This list is not exhaustive and will be updated.

---

### CI Errors
A lot of minor issues will be caught in the CI checks
* JSON parsing issues
* Schema issues

If the CI is failing, tag the user and comment on the pr.

---

### Contents of the website
We need to make sure that the contents being hosted via the record being registered is ***not*** used for malicious purposes.
To do this, we must try our best to verify the contents of website and if required ask some questions regarding the contents in the PR.

---

### Ownership of the document
Make sure that any document being updated, has the correct owner. If someone tries to edit a cname in an already existing file, check if the user shown with git blame, matches the user who created the edit pull request. In case of a mismatch, let them know that your user doesn't match the author and they should either use the original user to create a new pr or ask them to approve the pr using the original user account.

---

### Abuse reports
In case anyone reports a domain for being abusive -
* Ask the person reporting for some screenshots and adequate proof. If they don't you can not act on the report
* Create a pull request removing the reported domain json file
* Tag the owner of that domain json file (use git blame) and use email/social link provided to inform them
* Give them 1 day to respond and then remove the record

---

### Invalid Email/Social Link
A way to contact the user is important in case we need to inform the users of some changes to the project.
Confirm if the email looks valid or the social user name/link works.
The user should have either an email or a valid social link.

❌ `{ "username": "phenax" }` is invalid as it doesn't contain an email or any social links

❌ `"email": "28372878+user-name@users.noreply.github.com"` is invalid as the email cannot be used

✅ `"twitter": "twitter-username"` is valid as it contains a social link

✅ `"email": "email@gmail.com"` is valid as it contains an email

---

### Invalid CNAME
CNAME has to be a hostname. Something like `example.com`.

❌ `http://example.com` is invalid as it contains a protocol `https://`

❌ `example.com/some/path` is invalid as it contains the path name `/some/path`

❌ `example.com:3302` is invalid as it contains the port number

✅ `example.com` is valid as it is the hostname of the website

---

### Invalid A
A record has to be an array of ips.

❌ `"A": "211.211.211.211"` is invalid as it must be an array

❌ `"A": ["example.com"]` is invalid as it is not an ip address

✅ `"A": ["211.211.211.211", "211.211.211.212"]` is valid as it is an array of ips

---

### Invalid URL
The URL must have a protocol (`http://` or `https://`) and must be something like `https://example.com` or `https://example.com/some/path`.

❌ `example.com` is invalid as it doesn't contain the protocol

✅ `https://example.com/some/path` is valid as it contains a protocol

---

### Only A Few Record Types
Earlier, is-a-dev used to allow for handling https redirections along with CNAME but the way we handle requests has changed since then.
This is why a record file can only contain a few record types. Either `CNAME` or `A` or `URL`, `MX` cannot be used with `CNAME` and `TXT` can be used with any other record type.
One caveat with `TXT` records is that it can only hold one value at a time.

❌ `"CNAME": "example.com", "URL": "https://something.com"` is invalid as it should only contain one type of record, either `CNAME` or `URL`.

❌ `"CNAME": "example.com", "MX": [ "mx1.example.com", "mx2.example.com" ]` is invalid as it cannot contain `CNAME` and `MX` at the same time.

❌ `"CNAME": "https://example.com/", "TXT": [ "TXT record 1", "TXT record 2" ]` is invalid as the `TXT` record must be a string and not an array.

✅ `"URL": "https://example.com/", "MX": [ "mx1.example.com", "mx2.example.com" ]` is valid as it only contains `URL` and `MX` records.

---

### Sub-sub domains
Make sure that any sub-sub-domain registered is owned by the user handling the subdomain.
Example - If someone is trying to register `blog.example.is-a.dev`, make sure that `example.is-a.dev` is owned by the same user.
