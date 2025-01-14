PGDMP  2    2                |            rateio    16.3    16.3 5               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    16513    rateio    DATABASE     }   CREATE DATABASE rateio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE rateio;
                postgres    false            �            1259    16942    budget_group    TABLE     �   CREATE TABLE public.budget_group (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    service_group_id integer NOT NULL
);
     DROP TABLE public.budget_group;
       public         heap    postgres    false            �            1259    16941    budget_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.budget_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.budget_group_id_seq;
       public          postgres    false    222            #           0    0    budget_group_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.budget_group_id_seq OWNED BY public.budget_group.id;
          public          postgres    false    221            �            1259    16875    cost_center    TABLE     f   CREATE TABLE public.cost_center (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.cost_center;
       public         heap    postgres    false            �            1259    16874    cost_center_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cost_center_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cost_center_id_seq;
       public          postgres    false    218            $           0    0    cost_center_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cost_center_id_seq OWNED BY public.cost_center.id;
          public          postgres    false    217            �            1259    16868    product    TABLE     Y   CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(50)
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16867    product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.product_id_seq;
       public          postgres    false    216            %           0    0    product_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;
          public          postgres    false    215            �            1259    16983    prorate    TABLE     }   CREATE TABLE public.prorate (
    id integer NOT NULL,
    percent numeric,
    total numeric,
    transaction_id integer
);
    DROP TABLE public.prorate;
       public         heap    postgres    false            �            1259    16982    prorate_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prorate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.prorate_id_seq;
       public          postgres    false    226            &           0    0    prorate_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.prorate_id_seq OWNED BY public.prorate.id;
          public          postgres    false    225            �            1259    16930    service_group    TABLE     �   CREATE TABLE public.service_group (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    cost_center_id integer NOT NULL
);
 !   DROP TABLE public.service_group;
       public         heap    postgres    false            �            1259    16929    service_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.service_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.service_group_id_seq;
       public          postgres    false    220            '           0    0    service_group_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.service_group_id_seq OWNED BY public.service_group.id;
          public          postgres    false    219            �            1259    16954    transaction    TABLE     g  CREATE TABLE public.transaction (
    id integer NOT NULL,
    nature character varying(50),
    unity character varying(50),
    quantity numeric,
    unity_price numeric,
    total_price numeric,
    contabil_classification character varying(50),
    product_id integer,
    costcenter_id integer,
    servicegroup_id integer,
    budgetgroup_id integer
);
    DROP TABLE public.transaction;
       public         heap    postgres    false            �            1259    16953    transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.transaction_id_seq;
       public          postgres    false    224            (           0    0    transaction_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;
          public          postgres    false    223            l           2604    16945    budget_group id    DEFAULT     r   ALTER TABLE ONLY public.budget_group ALTER COLUMN id SET DEFAULT nextval('public.budget_group_id_seq'::regclass);
 >   ALTER TABLE public.budget_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            j           2604    16878    cost_center id    DEFAULT     p   ALTER TABLE ONLY public.cost_center ALTER COLUMN id SET DEFAULT nextval('public.cost_center_id_seq'::regclass);
 =   ALTER TABLE public.cost_center ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            i           2604    16871 
   product id    DEFAULT     h   ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);
 9   ALTER TABLE public.product ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            n           2604    16986 
   prorate id    DEFAULT     h   ALTER TABLE ONLY public.prorate ALTER COLUMN id SET DEFAULT nextval('public.prorate_id_seq'::regclass);
 9   ALTER TABLE public.prorate ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            k           2604    16933    service_group id    DEFAULT     t   ALTER TABLE ONLY public.service_group ALTER COLUMN id SET DEFAULT nextval('public.service_group_id_seq'::regclass);
 ?   ALTER TABLE public.service_group ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            m           2604    16957    transaction id    DEFAULT     p   ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);
 =   ALTER TABLE public.transaction ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224                      0    16942    budget_group 
   TABLE DATA           B   COPY public.budget_group (id, name, service_group_id) FROM stdin;
    public          postgres    false    222    =                 0    16875    cost_center 
   TABLE DATA           /   COPY public.cost_center (id, name) FROM stdin;
    public          postgres    false    218   �=                 0    16868    product 
   TABLE DATA           +   COPY public.product (id, name) FROM stdin;
    public          postgres    false    216   >                 0    16983    prorate 
   TABLE DATA           E   COPY public.prorate (id, percent, total, transaction_id) FROM stdin;
    public          postgres    false    226   @>                 0    16930    service_group 
   TABLE DATA           A   COPY public.service_group (id, name, cost_center_id) FROM stdin;
    public          postgres    false    220   ]>                 0    16954    transaction 
   TABLE DATA           �   COPY public.transaction (id, nature, unity, quantity, unity_price, total_price, contabil_classification, product_id, costcenter_id, servicegroup_id, budgetgroup_id) FROM stdin;
    public          postgres    false    224   �>       )           0    0    budget_group_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.budget_group_id_seq', 36, true);
          public          postgres    false    221            *           0    0    cost_center_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cost_center_id_seq', 3, true);
          public          postgres    false    217            +           0    0    product_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.product_id_seq', 3, true);
          public          postgres    false    215            ,           0    0    prorate_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.prorate_id_seq', 103, true);
          public          postgres    false    225            -           0    0    service_group_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.service_group_id_seq', 9, true);
          public          postgres    false    219            .           0    0    transaction_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.transaction_id_seq', 63, true);
          public          postgres    false    223            v           2606    16947    budget_group budget_group_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.budget_group
    ADD CONSTRAINT budget_group_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.budget_group DROP CONSTRAINT budget_group_pkey;
       public            postgres    false    222            r           2606    16880    cost_center cost_center_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cost_center
    ADD CONSTRAINT cost_center_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.cost_center DROP CONSTRAINT cost_center_pkey;
       public            postgres    false    218            p           2606    16873    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    216            z           2606    16990    prorate prorate_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.prorate
    ADD CONSTRAINT prorate_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.prorate DROP CONSTRAINT prorate_pkey;
       public            postgres    false    226            t           2606    16935     service_group service_group_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.service_group
    ADD CONSTRAINT service_group_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.service_group DROP CONSTRAINT service_group_pkey;
       public            postgres    false    220            x           2606    16961    transaction transaction_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_pkey;
       public            postgres    false    224            |           2606    16948 /   budget_group budget_group_service_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.budget_group
    ADD CONSTRAINT budget_group_service_group_id_fkey FOREIGN KEY (service_group_id) REFERENCES public.service_group(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.budget_group DROP CONSTRAINT budget_group_service_group_id_fkey;
       public          postgres    false    220    222    4724            �           2606    16997 #   prorate prorate_transaction_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.prorate
    ADD CONSTRAINT prorate_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.prorate DROP CONSTRAINT prorate_transaction_id_fkey;
       public          postgres    false    224    226    4728            {           2606    16936 /   service_group service_group_cost_center_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.service_group
    ADD CONSTRAINT service_group_cost_center_id_fkey FOREIGN KEY (cost_center_id) REFERENCES public.cost_center(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.service_group DROP CONSTRAINT service_group_cost_center_id_fkey;
       public          postgres    false    218    220    4722            }           2606    16977 +   transaction transaction_budgetgroup_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_budgetgroup_id_fkey FOREIGN KEY (budgetgroup_id) REFERENCES public.budget_group(id);
 U   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_budgetgroup_id_fkey;
       public          postgres    false    222    4726    224            ~           2606    16967 *   transaction transaction_costcenter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_costcenter_id_fkey FOREIGN KEY (costcenter_id) REFERENCES public.cost_center(id);
 T   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_costcenter_id_fkey;
       public          postgres    false    218    4722    224                       2606    16962 '   transaction transaction_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);
 Q   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_product_id_fkey;
       public          postgres    false    224    4720    216            �           2606    16972 ,   transaction transaction_servicegroup_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_servicegroup_id_fkey FOREIGN KEY (servicegroup_id) REFERENCES public.service_group(id);
 V   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_servicegroup_id_fkey;
       public          postgres    false    224    4724    220               �   x�EлA��xU0g{�)u�� �X������{}�ߛ5�Y�gyUdEUo�U#kTͬY�Z�VՙuV�����u���Li(a�Cʀ�CS b�Q3�"�Ô��P-�T-�T1�����bJES*�6B*��R���	e_�         0   x�3�tt����	r���2���2�t��s�sv������� �L	         ,   x�3���/IM����2�tI-�.�/�2�����,�/����� �
{            x������ � �         G   x�3�t/�/-Pp�4�2����lc(��6��]8��L�lW ��v�͡lwNc.(�ȶ��=��=... >;F         )   x�33���450�415�42�89c�8�9M�W� eD�     