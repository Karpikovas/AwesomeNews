<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NewsMusicRepository")
 */
class NewsMusic
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $Title;

    /**
     * @ORM\Column(type="text")
     */
    private $Link;

    /**
     * @ORM\Column(type="text")
     */
    private $Guid;

    /**
     * @ORM\Column(type="text")
     */
    private $Description;

    /**
     * @ORM\Column(type="text")
     */
    private $Date;

    /**
     * @ORM\Column(type="text")
     */
    private $NewsJSON;

    /**
     * @ORM\Column(type="text")
     */
    private $Category;

    public function getTitle(): ?string
    {
        return $this->Title;
    }

    public function setTitle(string $Title): self
    {
        $this->Title = $Title;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->Link;
    }

    public function setLink(string $Link): self
    {
        $this->Link = $Link;

        return $this;
    }

    public function getGuid(): ?string
    {
        return $this->Guid;
    }

    public function setGuid(string $Guid): self
    {
        $this->Guid = $Guid;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->Date;
    }

    public function setDate(string $Date): self
    {
        $this->Date = $Date;

        return $this;
    }

    public function getNewsJSON(): ?string
    {
        return $this->NewsJSON;
    }

    public function setNewsJSON(string $NewsJSON): self
    {
        $this->NewsJSON = $NewsJSON;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->Category;
    }

    public function setCategory(string $Category): self
    {
        $this->Category = $Category;

        return $this;
    }
}
