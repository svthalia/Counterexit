

create table users
(
    name  varchar not null,
    image varchar not null,
    pk    integer not null
        constraint users_pk
            primary key
);

alter table users
    owner to dishwasher;

create unique index users_pk_uindex
    on users (pk);

grant insert, select, update on users to dishwasher;

create table washes
(
    pk   integer   not null
        constraint washes_users_pk_fk
            references users,
    time timestamp not null
);

alter table washes
    owner to dishwasher;

create unique index washes_time_uindex
    on washes (time);

create table winners
(
    pk     integer not null
        constraint winners_users_pk_fk
            references users,
    time   varchar not null,
    washes integer not null
);

alter table winners
    owner to dishwasher;

create unique index winners_time_uindex
    on winners (time);

