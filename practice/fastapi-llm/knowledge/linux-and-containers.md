# Linux and containers

Linux systems administration underpins modern backend work: users and
permissions, systemd services, firewalls, TLS certificates, DNS, and log
journaling via `journalctl`. When an application misbehaves in production,
the first questions are operational — is the process running, is the port
listening, what do the logs say.

Docker packages an application with its dependencies into an image. Best
practices for small services: start from a slim base image, pin dependency
versions in a lockfile or requirements file, run as a non-root user, and
copy only the files the runtime needs. Images should be immutable — configure
the app with environment variables at runtime, never by rebuilding.

# Compose and reverse proxies

Docker Compose wires multiple services together with named networks and
volumes, which is how a multi-service platform with per-service databases is
delivered as one command. Nginx typically sits in front as a reverse proxy:
it terminates TLS, serves static frontend assets, and forwards API paths to
the right internal service by location prefix.

# Debugging across layers

Cross-layer debugging follows the request path: browser → reverse proxy →
gateway → service → database. Knowing where to look — and how to read proxy
error logs, container logs, and SQL query plans — is the practical value of
an infrastructure background applied to software engineering.
