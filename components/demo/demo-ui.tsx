"use client";

import { useState } from "react";

import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Chart,
  Dialog,
  Drawer,
  HoverCard,
  Item,
  OneWayDealCard,
  DestinationSpotlightCard,
  PromoCarouselSection,
  ScrollArea,
  Separator,
  Skeleton,
  Spinner,
  useSonner,
} from "@/components/ui";

export function DemoUi() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { push } = useSonner();

  return (
    <section className="grid gap-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
          UI Components
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
          Showcase komponen UI reusable
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Semua komponen di bawah punya default styling dan tetap bisa di-custom lewat
          `className`.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card title="Feedback" description="Alert, badge, avatar, breadcrumb, button, button group">
          <div className="grid gap-4">
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "#" },
                { label: "Components", href: "#" },
                { label: "UI" },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Avatar fallback="WA" />
              <Avatar fallback="WN" size="lg" />
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
            <Alert title="Default alert" description="Ini alert default." />
            <Alert variant="success" title="Success alert" description="Data berhasil disimpan." />
            <Alert variant="warning" title="Warning alert" description="Periksa kembali input." />
            <ButtonGroup>
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </ButtonGroup>
          </div>
        </Card>

        <Card title="Surfaces" description="Card, item, separator, skeleton, spinner">
          <div className="grid gap-4">
            <Item
              title="Project Neptune"
              description="Realtime analytics dashboard for finance team."
              trailing={<Badge variant="success">Live</Badge>}
            />
            <Separator />
            <div className="grid gap-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="flex items-center gap-3">
              <Spinner />
              <Spinner size="lg" />
            </div>
          </div>
        </Card>

        <Card title="Disclosure" description="Accordion, hover card, dialog, alert dialog, drawer">
          <div className="grid gap-4">
            <Accordion
              items={[
                {
                  id: "a",
                  title: "What is included?",
                  content: "Accordion ini bisa dipakai untuk FAQ atau content toggle.",
                },
                {
                  id: "b",
                  title: "Can it be customized?",
                  content: "Ya, lewat className di wrapper, item, trigger, dan content.",
                },
              ]}
            />
            <HoverCard
              trigger={
                <Button variant="secondary" className="w-fit">
                  Hover card
                </Button>
              }
              content={
                <div className="grid gap-2">
                  <p className="text-sm font-semibold text-zinc-950">Quick profile</p>
                  <p className="text-sm text-zinc-500">
                    Hover card cocok untuk info singkat tanpa pindah halaman.
                  </p>
                </div>
              }
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                Open Dialog
              </Button>
              <Button variant="secondary" onClick={() => setAlertDialogOpen(true)}>
                Open Alert Dialog
              </Button>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                Open Drawer
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Content" description="Carousel, chart, scroll area, sonner">
          <div className="grid gap-4">
            <Carousel
              items={[
                <div key="1" className="grid gap-2">
                  <p className="text-lg font-semibold text-zinc-950">Slide One</p>
                  <p className="text-sm text-zinc-500">Carousel tanpa dependency tambahan.</p>
                </div>,
                <div key="2" className="grid gap-2">
                  <p className="text-lg font-semibold text-zinc-950">Slide Two</p>
                  <p className="text-sm text-zinc-500">Bisa dipakai untuk hero, cards, atau gallery.</p>
                </div>,
                <div key="3" className="grid gap-2">
                  <p className="text-lg font-semibold text-zinc-950">Slide Three</p>
                  <p className="text-sm text-zinc-500">Styling tetap bisa dioverride.</p>
                </div>,
              ]}
            />
            <Chart
              data={[
                { label: "Jan", value: 24 },
                { label: "Feb", value: 36 },
                { label: "Mar", value: 28 },
                { label: "Apr", value: 42 },
              ]}
            />
            <ScrollArea className="max-h-40 border border-zinc-200 bg-zinc-50 p-4">
              <div className="grid gap-3 text-sm text-zinc-600">
                {Array.from({ length: 8 }, (_, index) => (
                  <p key={index}>
                    Scroll area item {index + 1}. Ini contoh area dengan overflow yang bisa di-scroll.
                  </p>
                ))}
              </div>
            </ScrollArea>
            <Button
              variant="secondary"
              onClick={() =>
                push({
                  title: "Toast created",
                  description: "Ini contoh Sonner sederhana tanpa dependency tambahan.",
                })
              }
            >
              Show Sonner
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
            Travel Cards
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Komponen visual seperti referensi travel promo
          </h3>
        </div>

        <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          <OneWayDealCard
            image="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=80"
            route="Jakarta - Bali / Denpasar"
            date="19 Sept 2026"
            price="Rp 1.104.700"
          />

          <div className="grid gap-8">
            <DestinationSpotlightCard
              image="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80"
              title="Hong Kong"
              subtitle="960 accommodations"
            />

            <PromoCarouselSection
              title="Best deals for a price-less travel!"
              tabs={[
                { id: "flight", label: "Flight" },
                { id: "hotels", label: "Hotels" },
                { id: "bus", label: "Bus & Travel" },
                { id: "cars", label: "Cars" },
                { id: "todo", label: "Things to Do" },
              ]}
              cards={[
                {
                  id: "kr",
                  image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=1200&q=80",
                  accentFrom: "#71c7ff",
                  accentTo: "#38d7ca",
                  destination: "SOUTH KOREA",
                  discount: "50%",
                },
                {
                  id: "my",
                  image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
                  accentFrom: "#ff7fa0",
                  accentTo: "#1677d7",
                  destination: "MALAYSIA",
                  discount: "50%",
                },
                {
                  id: "th",
                  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
                  accentFrom: "#234f9d",
                  accentTo: "#f6a531",
                  destination: "THAILAND",
                  discount: "50%",
                },
                {
                  id: "jp",
                  image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
                  accentFrom: "#2d5ec9",
                  accentTo: "#db4879",
                  destination: "JAPAN",
                  discount: "45%",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Example Dialog"
        description="Dialog dasar untuk custom content."
      >
        <p className="text-sm text-zinc-600">
          Kamu bisa isi dialog ini dengan form, konfirmasi, atau detail data.
        </p>
      </Dialog>

      <AlertDialog
        open={alertDialogOpen}
        onOpenChange={setAlertDialogOpen}
        title="Delete item?"
        description="Aksi ini tidak bisa dibatalkan."
        onConfirm={() => {
          push({
            title: "Deleted",
            description: "Contoh konfirmasi action dari alert dialog.",
          });
          setAlertDialogOpen(false);
        }}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Example Drawer">
        <div className="grid gap-3 text-sm text-zinc-600">
          <p>Drawer cocok untuk filter panel, detail singkat, atau side content.</p>
          <p>Semua styling default masih bisa dioverride lewat `className`.</p>
        </div>
      </Drawer>
    </section>
  );
}
